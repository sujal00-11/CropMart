"""
CropMart — Order Schemas
"""

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class CartItem(BaseModel):
    product_id: int
    product_name: str
    quantity_kg: float
    unit_price: float


class CheckoutRequest(BaseModel):
    items: List[CartItem]
    delivery_name: str
    delivery_phone: str
    delivery_address: str
    payment_method: str = "upi"  # upi, card, cod


class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    product_name: str
    quantity_kg: float
    unit_price: float

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: int
    order_ref: str
    buyer_id: int
    status: str
    total_amount: float
    logistics_fee: float
    delivery_address: Optional[str] = None
    delivery_name: Optional[str] = None
    delivery_phone: Optional[str] = None
    payment_method: str
    payment_status: str
    created_at: Optional[datetime] = None
    items: List[OrderItemResponse] = []

    class Config:
        from_attributes = True


class StatusUpdate(BaseModel):
    status: str
