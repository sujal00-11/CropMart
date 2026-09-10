"""
CropMart — Market-related Models
BulkRequirement, Match, MarketPrice, DemandForecast, Route, Payment
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, func
from app.database import Base


class BulkRequirement(Base):
    __tablename__ = "bulk_requirements"

    id = Column(Integer, primary_key=True, index=True)
    buyer_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    product_name = Column(String(100), nullable=False)
    quantity_kg = Column(Float, nullable=False)
    max_price = Column(Float, nullable=False)
    location = Column(String(255), nullable=False)
    required_date = Column(String(20), nullable=True)
    status = Column(String(20), default="open")  # open, matched, fulfilled, cancelled
    created_at = Column(DateTime, server_default=func.now())


class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    requirement_id = Column(Integer, ForeignKey("bulk_requirements.id"), nullable=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=True)
    buyer_id = Column(Integer, nullable=True)
    seller_id = Column(Integer, nullable=True)
    score = Column(Float, nullable=False)
    offer_price = Column(Float, nullable=True)
    distance_km = Column(Float, nullable=True)
    status = Column(String(20), default="pending")  # pending, accepted, rejected
    created_at = Column(DateTime, server_default=func.now())


class MarketPrice(Base):
    __tablename__ = "market_prices"

    id = Column(Integer, primary_key=True, index=True)
    crop = Column(String(50), nullable=False, index=True)
    location = Column(String(255), nullable=True)
    price = Column(Float, nullable=False)
    recorded_at = Column(DateTime, server_default=func.now())


class DemandForecast(Base):
    __tablename__ = "demand_forecasts"

    id = Column(Integer, primary_key=True, index=True)
    crop = Column(String(50), nullable=False, index=True)
    location = Column(String(255), nullable=True)
    current_demand = Column(Float, nullable=False)
    predicted_demand = Column(Float, nullable=False)
    trend_pct = Column(Float, nullable=False)
    confidence = Column(Float, nullable=False)
    recommendation = Column(String(255), nullable=True)
    generated_at = Column(DateTime, server_default=func.now())


class Route(Base):
    __tablename__ = "routes"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=True)
    distance_km = Column(Float, nullable=False)
    eta_minutes = Column(Integer, nullable=False)
    cost = Column(Float, nullable=False)
    vehicle_type = Column(String(50), default="Mini Truck (1.5T)")
    optimized = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False, index=True)
    amount = Column(Float, nullable=False)
    method = Column(String(20), nullable=False)  # upi, card, cod
    status = Column(String(20), default="completed")  # pending, completed, failed
    transaction_ref = Column(String(50), nullable=True)
    created_at = Column(DateTime, server_default=func.now())
