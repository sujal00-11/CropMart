"""
CropMart — Application Configuration
Uses pydantic-settings for environment variable management.
"""

from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite:///./cropmart.db"

    # JWT
    JWT_SECRET: str = "cropmart-super-secret-key-change-in-production-2026"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # App
    APP_NAME: str = "CropMart"
    DEBUG: bool = True

    # Frontend path (relative to backend directory)
    FRONTEND_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "..")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
