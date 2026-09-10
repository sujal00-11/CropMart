"""
CropMart — Order & OrderItem Models
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, func
from app.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_ref = Column(String(20), unique=True, nullable=False, index=True)  # CM-XXXXXXXX
    buyer_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    status = Column(String(30), default="Order Placed")
    # Statuses: Order Placed, Farmer Confirmed, Produce Aggregated, Picked Up, In Transit, Delivered
    total_amount = Column(Float, nullable=False)
    logistics_fee = Column(Float, default=0)
    delivery_address = Column(String(500), nullable=True)
    delivery_name = Column(String(100), nullable=True)
    delivery_phone = Column(String(20), nullable=True)
    payment_method = Column(String(20), default="upi")  # upi, card, cod
    payment_status = Column(String(20), default="completed")  # pending, completed, failed
    created_at = Column(DateTime, server_default=func.now())


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    product_name = Column(String(100), nullable=False)
    quantity_kg = Column(Float, nullable=False)
    unit_price = Column(Float, nullable=False)
