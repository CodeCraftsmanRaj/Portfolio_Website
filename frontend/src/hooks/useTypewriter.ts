import { useState, useEffect } from 'react';
import { OsMode } from '../data/portfolioData';

interface UseTypewriterOptions {
  speed?: number; // ms per character
  startDelay?: number; // ms before starting
  osMode?: OsMode;
}

export function useTypewriter(
  text: string | string[],
  options: UseTypewriterOptions = {}
) {
  const { osMode = 'LINUX', startDelay = 0 } = options;

  // OS-specific default typing speeds
  const defaultSpeed = osMode === 'LINUX' ? 20 : osMode === 'WIN' ? 10 : 35;
  const speed = options.speed ?? defaultSpeed;

  const lines = Array.isArray(text) ? text : [text];
  const [displayedLines, setDisplayedLines] = useState<string[]>(lines.map(() => ''));
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset on text or mode change
    setDisplayedLines(lines.map(() => ''));
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsComplete(false);
  }, [JSON.stringify(text), osMode]);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const currentTargetLine = lines[currentLineIndex];

    if (currentCharIndex <= currentTargetLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const updated = [...prev];
          updated[currentLineIndex] = currentTargetLine.slice(0, currentCharIndex);
          return updated;
        });
        setCurrentCharIndex(c => c + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setCurrentLineIndex(l => l + 1);
      setCurrentCharIndex(0);
    }
  }, [currentLineIndex, currentCharIndex, lines, speed]);

  return {
    lines: displayedLines,
    fullText: displayedLines.join('\n'),
    isComplete,
  };
}
