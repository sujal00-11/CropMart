"""
CropMart — Market Schemas (AI, Matching, Requirements)
"""

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# --- Demand Forecast ---
class DemandResponse(BaseModel):
    crop: str
    current_demand: float
    predicted_demand: float
    trend_pct: float
    recommendation: str
    confidence: float
    chart_data: dict = {}


# --- Price Intelligence ---
class PriceResponse(BaseModel):
    crop: str
    market_price: float
    local_average: float
    suggested_price: float
    trend: str  # up, down, stable
    chart_data: dict = {}


# --- Buyer Matching ---
class MatchResult(BaseModel):
    name: str
    score: float
    required_qty: float
    distance_km: float
    offer_price: float


class MatchResponse(BaseModel):
    product: str
    matches: List[MatchResult]


# --- Route Optimization ---
class RouteResponse(BaseModel):
    distance_km: float
    eta_minutes: int
    eta_display: str
    cost: float
    vehicle_type: str
    optimized: bool


# --- Bulk Requirement ---
class BulkRequirementCreate(BaseModel):
    product_name: str
    quantity_kg: float
    max_price: float
    location: str
    required_date: Optional[str] = None


class BulkRequirementResponse(BaseModel):
    id: int
    buyer_id: int
    product_name: str
    quantity_kg: float
    max_price: float
    location: str
    required_date: Optional[str] = None
    status: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
