"""
CropMart — AI API Endpoints
Demand forecast, price intelligence, buyer matching, route optimization.
"""

from fastapi import APIRouter, Query
from typing import Optional

from app.services.ai.demand import get_demand_forecast
from app.services.ai.price import get_price_intelligence
from app.services.ai.matching import get_buyer_matches
from app.services.ai.routing import optimize_route, get_default_route
from app.schemas.market import DemandResponse, PriceResponse, MatchResponse, RouteResponse

router = APIRouter(prefix="/ai", tags=["AI"])


@router.get("/demand", response_model=DemandResponse)
def demand_forecast(
    crop: str = Query(..., description="Crop name (e.g. tomato, potato, onion)"),
    location: Optional[str] = Query(None, description="Location for regional adjustment"),
):
    return get_demand_forecast(crop, location)


@router.get("/price", response_model=PriceResponse)
def price_intelligence(
    crop: str = Query(..., description="Crop name"),
    location: Optional[str] = Query(None, description="Location for regional adjustment"),
):
    return get_price_intelligence(crop, location)


@router.get("/match", response_model=MatchResponse)
def buyer_matching(
    product: str = Query(..., description="Product name"),
    sort: Optional[str] = Query("score", description="Sort by: score, price, distance, qty"),
):
    return get_buyer_matches(product, sort)


@router.post("/route/optimize", response_model=RouteResponse)
def route_optimize(order_id: Optional[int] = None):
    return optimize_route(order_id)


@router.get("/route/default", response_model=RouteResponse)
def route_default():
    return get_default_route()
