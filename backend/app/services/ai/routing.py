"""
CropMart — AI Route Optimization Service
Phase 1: Simple nearest-neighbour optimization simulation.
"""

import random


# Fixed route scenarios for the demo
ROUTE_SCENARIOS = [
    {"distance_km": 38, "eta_minutes": 65,  "cost": 780, "vehicle_type": "Mini Truck (1.5T)"},
    {"distance_km": 35, "eta_minutes": 58,  "cost": 720, "vehicle_type": "Mini Truck (1.5T)"},
    {"distance_km": 42, "eta_minutes": 75,  "cost": 850, "vehicle_type": "Mini Truck (1.5T)"},
    {"distance_km": 31, "eta_minutes": 52,  "cost": 690, "vehicle_type": "Pickup Van (0.8T)"},
    {"distance_km": 29, "eta_minutes": 48,  "cost": 650, "vehicle_type": "Pickup Van (0.8T)"},
    {"distance_km": 55, "eta_minutes": 95,  "cost": 1100, "vehicle_type": "Medium Truck (3T)"},
    {"distance_km": 22, "eta_minutes": 38,  "cost": 520, "vehicle_type": "Pickup Van (0.8T)"},
]


def format_eta(minutes: int) -> str:
    """Format minutes as '1h 15m' or '45m'."""
    if minutes >= 60:
        h = minutes // 60
        m = minutes % 60
        return f"{h}h {m:02d}m" if m else f"{h}h"
    return f"{minutes}m"


def optimize_route(order_id: int = None) -> dict:
    """
    Simulate route optimization.
    Phase 1: picks an optimized scenario from pre-computed options.
    Always returns a "better" route than the default (42km, 75min, ₹850).
    """
    # Simulate optimization by picking one of the shorter/cheaper routes
    optimized_scenarios = [s for s in ROUTE_SCENARIOS if s["distance_km"] <= 38]
    scenario = random.choice(optimized_scenarios)

    return {
        "distance_km": scenario["distance_km"],
        "eta_minutes": scenario["eta_minutes"],
        "eta_display": format_eta(scenario["eta_minutes"]),
        "cost": scenario["cost"],
        "vehicle_type": scenario["vehicle_type"],
        "optimized": True,
    }


def get_default_route() -> dict:
    """Return the unoptimized default route for initial display."""
    return {
        "distance_km": 42,
        "eta_minutes": 75,
        "eta_display": "1h 15m",
        "cost": 850,
        "vehicle_type": "Mini Truck (1.5T)",
        "optimized": False,
    }
