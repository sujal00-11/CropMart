"""
CropMart — AI Buyer Matching Service
Phase 1: Weighted score = f(price fit, qty fit, distance, grade).
"""

BUYER_MATCHES_BASE = {
    "tomato": [
        {"name": "FreshMart Wholesale", "score": 96, "req": 400, "distance": 18, "offer": 29},
        {"name": "GreenBasket",         "score": 91, "req": 300, "distance": 25, "offer": 28},
        {"name": "CityFresh Retail",    "score": 84, "req": 200, "distance": 32, "offer": 27},
    ],
    "potato": [
        {"name": "AgroLink Traders",    "score": 94, "req": 600, "distance": 22, "offer": 19},
        {"name": "FreshMart Wholesale", "score": 88, "req": 400, "distance": 30, "offer": 18},
        {"name": "DailyVeg Co.",        "score": 79, "req": 250, "distance": 15, "offer": 17.5},
    ],
    "onion": [
        {"name": "OnionHub Bulk",       "score": 93, "req": 500, "distance": 12, "offer": 23},
        {"name": "GreenBasket",         "score": 87, "req": 350, "distance": 28, "offer": 22},
        {"name": "MetroMart",           "score": 81, "req": 200, "distance": 40, "offer": 21},
    ],
    "wheat": [
        {"name": "GrainCorp India",     "score": 95, "req": 1000, "distance": 35, "offer": 25},
        {"name": "FoodPark Wholesale",  "score": 89, "req": 800,  "distance": 20, "offer": 24},
        {"name": "Metro Agro",          "score": 82, "req": 500,  "distance": 45, "offer": 23.5},
    ],
    "rice": [
        {"name": "RiceWorld Exports",   "score": 94, "req": 1200, "distance": 28, "offer": 44},
        {"name": "FreshMart Wholesale", "score": 87, "req": 500,  "distance": 22, "offer": 42},
        {"name": "LocalMart",           "score": 80, "req": 300,  "distance": 15, "offer": 41},
    ],
    "mango": [
        {"name": "TropiFruit Exports",  "score": 97, "req": 200, "distance": 15, "offer": 70},
        {"name": "FreshMart Wholesale", "score": 90, "req": 150, "distance": 25, "offer": 66},
        {"name": "JuiceBar Co.",        "score": 85, "req": 100, "distance": 30, "offer": 62},
    ],
}


def get_buyer_matches(product: str, sort_by: str = "score") -> dict:
    """
    Return ranked buyer matches for a product.
    Phase 1: seeded demo data with sorting.
    """
    product_lower = product.lower().strip()
    matches = BUYER_MATCHES_BASE.get(product_lower)

    if not matches:
        # Generate fallback matches
        seed = sum(ord(c) for c in product_lower) % 30
        matches = [
            {"name": "Wholesale Buyer A", "score": 90 - seed % 10, "req": 400 + seed * 10, "distance": 20 + seed, "offer": 25 + seed},
            {"name": "Retail Buyer B",    "score": 82 - seed % 8,  "req": 250 + seed * 5,  "distance": 30 + seed, "offer": 23 + seed},
            {"name": "Local Buyer C",     "score": 75 - seed % 6,  "req": 150 + seed * 3,  "distance": 15 + seed, "offer": 20 + seed},
        ]

    # Sort
    if sort_by == "price":
        matches = sorted(matches, key=lambda x: x["offer"], reverse=True)
    elif sort_by == "distance":
        matches = sorted(matches, key=lambda x: x["distance"])
    elif sort_by == "qty":
        matches = sorted(matches, key=lambda x: x["req"], reverse=True)
    else:  # score (default)
        matches = sorted(matches, key=lambda x: x["score"], reverse=True)

    return {
        "product": product_lower,
        "matches": [
            {
                "name": m["name"],
                "score": m["score"],
                "required_qty": m["req"],
                "distance_km": m["distance"],
                "offer_price": m["offer"],
            }
            for m in matches
        ],
    }
