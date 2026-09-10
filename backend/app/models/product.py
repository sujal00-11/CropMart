"""
CropMart — Product Model
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, func
from app.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False, index=True)  # Vegetables, Fruits, Grains, Pulses
    quantity_kg = Column(Float, nullable=False)
    price_per_kg = Column(Float, nullable=False)
    grade = Column(String(5), nullable=False)  # A, B, C
    harvest_date = Column(String(20), nullable=True)
    location = Column(String(255), nullable=False, index=True)
    image_url = Column(String(500), nullable=True)
    availability = Column(String(100), nullable=True)
    status = Column(String(20), default="active", index=True)  # active, sold, expired
    farmer_name = Column(String(100), nullable=True)
    fpo_name = Column(String(100), nullable=True)
    created_at = Column(DateTime, server_default=func.now())
