import { useState, useEffect } from 'react';
import { OsMode } from '../data/portfolioData';

export interface DeviceDetectionResult {
  detectedMode: OsMode;
  isMobile: boolean;
  isTouch: boolean;
  deviceType: 'ios' | 'android' | 'mac' | 'windows' | 'linux';
}

export function detectDevice(): DeviceDetectionResult {
  if (typeof window === 'undefined') {
    return {
      detectedMode: 'LINUX',
      isMobile: false,
      isTouch: false,
      deviceType: 'linux',
    };
  }

  const ua = (navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '').toLowerCase();
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  const isTouch = maxTouchPoints > 0 || 'ontouchstart' in window || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;

  // iOS detection (iPhone, iPad, iPod, or iPad on iOS 13+ which reports MacIntel with touch points)
  const isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && maxTouchPoints > 1);
  
  // Android detection
  const isAndroid = /android/i.test(ua);

  // Generic mobile detection: Mobile UA, Touch screen with phone/tablet size, or screen width <= 860px
  const isMobileUA = /mobile|tablet|phone|ipod|iphone|ipad|android|blackberry|iemobile|kindle|silk|opera mini/i.test(ua);
  const isMobile = isIOS || isAndroid || isMobileUA || screenWidth <= 860;

  if (isMobile) {
    if (isIOS) {
      return {
        detectedMode: 'IOS',
        isMobile: true,
        isTouch,
        deviceType: 'ios',
      };
    }
    // Android is default for mobile
    return {
      detectedMode: 'ANDROID',
      isMobile: true,
      isTouch,
      deviceType: 'android',
    };
  }

  // Desktop detection
  const isMac = /macintosh|mac os x/i.test(ua) && !isTouch;
  const isWindows = /windows|win32|win64/i.test(ua);

  if (isMac) {
    return {
      detectedMode: 'MAC',
      isMobile: false,
      isTouch,
      deviceType: 'mac',
    };
  }

  if (isWindows) {
    return {
      detectedMode: 'WIN',
      isMobile: false,
      isTouch,
      deviceType: 'windows',
    };
  }

  // Linux is default for desktop
  return {
    detectedMode: 'LINUX',
    isMobile: false,
    isTouch,
    deviceType: 'linux',
  };
}

export function useDeviceDetection(): DeviceDetectionResult {
  const [deviceInfo, setDeviceInfo] = useState<DeviceDetectionResult>(() => detectDevice());

  useEffect(() => {
    const update = () => {
      setDeviceInfo(detectDevice());
    };

    update();

    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);

    const mql = window.matchMedia('(max-width: 860px)');
    if (mql.addEventListener) {
      mql.addEventListener('change', update);
    } else if ('addListener' in mql) {
      (mql as unknown as { addListener: (cb: () => void) => void }).addListener(update);
    }

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      if (mql.removeEventListener) {
        mql.removeEventListener('change', update);
      } else if ('removeListener' in mql) {
        (mql as unknown as { removeListener: (cb: () => void) => void }).removeListener(update);
      }
    };
  }, []);

  return deviceInfo;
}
