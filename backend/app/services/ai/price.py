"""
CropMart — AI Price Intelligence Service
Phase 1: Market price, local average, AI suggested price, trend.
"""

PRICE_BASE = {
    "tomato":       {"market": 28,  "local": 26,   "suggested": 29,  "trend": "up"},
    "potato":       {"market": 18,  "local": 17,   "suggested": 19,  "trend": "stable"},
    "onion":        {"market": 22,  "local": 23,   "suggested": 21,  "trend": "down"},
    "wheat":        {"market": 24,  "local": 23.5, "suggested": 25,  "trend": "up"},
    "rice":         {"market": 42,  "local": 40,   "suggested": 43,  "trend": "up"},
    "mango":        {"market": 65,  "local": 60,   "suggested": 68,  "trend": "up"},
    "cauliflower":  {"market": 30,  "local": 28,   "suggested": 31,  "trend": "up"},
    "mustard":      {"market": 55,  "local": 52,   "suggested": 56,  "trend": "stable"},
}


def get_price_intelligence(crop: str, location: str = None) -> dict:
    """
    Return price intelligence for a crop.
    Phase 1: local average ± adjustment → suggested price.
    """
    crop_lower = crop.lower().strip()
    base = PRICE_BASE.get(crop_lower)

    if not base:
        seed = sum(ord(c) for c in crop_lower) % 50
        market = 15 + seed
        base = {
            "market": market,
            "local": market - 1.5,
            "suggested": market + 1,
            "trend": "stable",
        }

    # Location-based variation
    if location:
        loc_hash = sum(ord(c) for c in location.lower()) % 10 - 5
        variation = loc_hash / 10  # ±0.5 per kg
    else:
        variation = 0

    market = round(base["market"] + variation, 1)
    local_avg = round(base["local"] + variation, 1)
    suggested = round(base["suggested"] + variation, 1)

    # Generate chart data (price trend over 6 periods)
    chart_labels = ["W-4", "W-3", "W-2", "W-1", "Current", "Forecast"]
    m = base["market"]
    chart_values = [
        round(m - 3, 1),
        round(m - 1, 1),
        round(m + 1, 1),
        round(m - 0.5, 1),
        round(market, 1),
        round(suggested, 1),
    ]

    return {
        "crop": crop_lower,
        "market_price": market,
        "local_average": local_avg,
        "suggested_price": suggested,
        "trend": base["trend"],
        "chart_data": {
            "labels": chart_labels,
            "values": chart_values,
        },
    }
