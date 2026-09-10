"""
CropMart — AI Demand Forecasting Service
Phase 1: Deterministic / statistical demo logic with real API contracts.
"""

import math
import random

# Seeded demand data — matches the original frontend demo data closely
# but adds deterministic variation based on crop + location
DEMAND_BASE = {
    "tomato":       {"current": 820,  "predicted": 1050, "trend": 27,  "rec": "Increase supply",       "confidence": 87},
    "potato":       {"current": 620,  "predicted": 700,  "trend": 13,  "rec": "Maintain supply",        "confidence": 82},
    "onion":        {"current": 1100, "predicted": 980,  "trend": -11, "rec": "Reduce excess listing",   "confidence": 79},
    "wheat":        {"current": 2400, "predicted": 2650, "trend": 10,  "rec": "Slight increase",         "confidence": 85},
    "rice":         {"current": 1800, "predicted": 1950, "trend": 8,   "rec": "Maintain supply",         "confidence": 81},
    "mango":        {"current": 420,  "predicted": 510,  "trend": 21,  "rec": "Increase supply",         "confidence": 88},
    "cauliflower":  {"current": 350,  "predicted": 410,  "trend": 17,  "rec": "Slight increase",         "confidence": 80},
    "mustard":      {"current": 550,  "predicted": 600,  "trend": 9,   "rec": "Maintain supply",         "confidence": 78},
}


def get_demand_forecast(crop: str, location: str = None) -> dict:
    """
    Return demand forecast for a crop.
    Phase 1: seeded curves + trend % + confidence.
    """
    crop_lower = crop.lower().strip()
    base = DEMAND_BASE.get(crop_lower)

    if not base:
        # Generate plausible fallback
        seed = sum(ord(c) for c in crop_lower) % 100
        current = 300 + seed * 10
        trend = (seed % 30) - 10
        predicted = int(current * (1 + trend / 100))
        base = {
            "current": current,
            "predicted": predicted,
            "trend": trend,
            "rec": "Increase supply" if trend > 10 else "Maintain supply" if trend >= 0 else "Reduce excess listing",
            "confidence": 70 + (seed % 20),
        }

    # Apply small location-based variation
    if location:
        loc_hash = sum(ord(c) for c in location.lower()) % 20 - 10
        variation = loc_hash / 100  # ±10%
    else:
        variation = 0

    current = int(base["current"] * (1 + variation))
    predicted = int(base["predicted"] * (1 + variation))
    trend = base["trend"]

    # Generate chart data (6 data points: past 4 weeks + current + forecast)
    chart_labels = ["W-4", "W-3", "W-2", "W-1", "Current", "Forecast"]
    chart_values = [
        int(current * 0.85),
        int(current * 0.90),
        int(current * 0.95),
        int(current * 0.98),
        current,
        predicted,
    ]

    return {
        "crop": crop_lower,
        "current_demand": current,
        "predicted_demand": predicted,
        "trend_pct": trend,
        "recommendation": base["rec"],
        "confidence": base["confidence"],
        "chart_data": {
            "labels": chart_labels,
            "values": chart_values,
        },
    }
