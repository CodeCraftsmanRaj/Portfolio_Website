from datetime import datetime
from typing import Annotated

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
import os

app = FastAPI(title="Portfolio Contact API")
allowed_origins = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


class ContactMessage(BaseModel):
    name: Annotated[str, Field(min_length=2, max_length=100)]
    email: EmailStr
    message: Annotated[str, Field(min_length=10, max_length=3000)]


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/contact", status_code=201)
def contact(message: ContactMessage) -> dict[str, str]:
    received_at = datetime.now().isoformat(timespec="seconds")
    print(f"Contact message received at {received_at} from {message.email}")
    return {"status": "received", "message": "Thanks, I will be in touch soon."}
