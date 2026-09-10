"""
CropMart — Product Schemas
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProductCreate(BaseModel):
    name: str
    category: str
    quantity_kg: float
    price_per_kg: float
    grade: str
    harvest_date: Optional[str] = None
    location: str
    image_url: Optional[str] = None
    availability: Optional[str] = None
    farmer_name: Optional[str] = None
    fpo_name: Optional[str] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    quantity_kg: Optional[float] = None
    price_per_kg: Optional[float] = None
    grade: Optional[str] = None
    harvest_date: Optional[str] = None
    location: Optional[str] = None
    image_url: Optional[str] = None
    availability: Optional[str] = None
    status: Optional[str] = None


class ProductResponse(BaseModel):
    id: int
    seller_id: int
    name: str
    category: str
    quantity_kg: float
    price_per_kg: float
    grade: str
    harvest_date: Optional[str] = None
    location: str
    image_url: Optional[str] = None
    availability: Optional[str] = None
    status: str
    farmer_name: Optional[str] = None
    fpo_name: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
