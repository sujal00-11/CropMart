"""
CropMart — Seed Data Script
Run with: python -m app.seed
Creates demo users, products, market prices, and orders.
"""

from app.database import engine, SessionLocal, Base
from app.models.user import User
from app.models.product import Product
from app.models.order import Order, OrderItem
from app.models.market import MarketPrice, DemandForecast, Payment
from app.core.security import hash_password


def seed():
    """Create all tables and populate with demo data."""
    # Create tables
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    # Check if already seeded
    if db.query(User).count() > 0:
        print("Database already seeded. Skipping.")
        db.close()
        return

    print("Seeding database...")

    # ── USERS ──
    users = [
        User(name="Ramesh Patil",     email="ramesh@cropmart.in",     phone="9876543210", password_hash=hash_password("demo123"), role="farmer",   location="Nashik"),
        User(name="Suresh Jadhav",    email="suresh@cropmart.in",     phone="9876543211", password_hash=hash_password("demo123"), role="farmer",   location="Pune"),
        User(name="Anita Deshmukh",   email="anita@cropmart.in",      phone="9876543212", password_hash=hash_password("demo123"), role="farmer",   location="Nashik"),
        User(name="Vijay Shinde",     email="vijay@cropmart.in",      phone="9876543213", password_hash=hash_password("demo123"), role="farmer",   location="Aurangabad"),
        User(name="Kavita More",      email="kavita@cropmart.in",     phone="9876543214", password_hash=hash_password("demo123"), role="farmer",   location="Kolhapur"),
        User(name="Prakash Pawar",    email="prakash@cropmart.in",    phone="9876543215", password_hash=hash_password("demo123"), role="farmer",   location="Kolhapur"),
        User(name="Meena Kale",       email="meena@cropmart.in",      phone="9876543216", password_hash=hash_password("demo123"), role="farmer",   location="Pune"),
        User(name="Ravi Chavan",      email="ravi@cropmart.in",       phone="9876543217", password_hash=hash_password("demo123"), role="farmer",   location="Nagpur"),
        User(name="Nashik Farmers FPO", email="nashikfpo@cropmart.in", phone="9876543218", password_hash=hash_password("demo123"), role="fpo",    location="Nashik"),
        User(name="FreshMart Wholesale", email="freshmart@cropmart.in", phone="9876543219", password_hash=hash_password("demo123"), role="buyer", location="Pune"),
        User(name="GreenBasket",      email="greenbasket@cropmart.in", phone="9876543220", password_hash=hash_password("demo123"), role="buyer",   location="Mumbai"),
        User(name="Priya Consumer",   email="priya@cropmart.in",      phone="9876543221", password_hash=hash_password("demo123"), role="consumer", location="Pune"),
    ]
    db.add_all(users)
    db.flush()

    # ── PRODUCTS ──
    # Farmer IDs: 1-8 based on insertion order
    products = [
        Product(
            seller_id=1, name="Tomato", category="Vegetables",
            quantity_kg=500, price_per_kg=28, grade="A",
            harvest_date="2026-09-02", location="Nashik",
            image_url="https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&q=80",
            farmer_name="Ramesh Patil", fpo_name="Nashik Farmers FPO",
            availability="2-3 days", status="active",
        ),
        Product(
            seller_id=2, name="Potato", category="Vegetables",
            quantity_kg=800, price_per_kg=18, grade="A",
            harvest_date="2026-08-28", location="Pune",
            image_url="https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80",
            farmer_name="Suresh Jadhav", fpo_name="Pune Agro FPO",
            availability="1-2 days", status="active",
        ),
        Product(
            seller_id=3, name="Onion", category="Vegetables",
            quantity_kg=1200, price_per_kg=22, grade="B",
            harvest_date="2026-08-20", location="Nashik",
            image_url="https://images.unsplash.com/photo-1592924357228-91b4b5c7d0b0?w=400&q=80",
            farmer_name="Anita Deshmukh", fpo_name="Lasalgaon Onion FPO",
            availability="2-4 days", status="active",
        ),
        Product(
            seller_id=4, name="Wheat", category="Grains",
            quantity_kg=2000, price_per_kg=24, grade="A",
            harvest_date="2026-04-15", location="Aurangabad",
            image_url="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",
            farmer_name="Vijay Shinde", fpo_name="Marathwada Grain FPO",
            availability="3-5 days", status="active",
        ),
        Product(
            seller_id=5, name="Rice", category="Grains",
            quantity_kg=1500, price_per_kg=42, grade="A",
            harvest_date="2026-05-10", location="Kolhapur",
            image_url="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80",
            farmer_name="Kavita More", fpo_name="Konkan Rice Collective",
            availability="3-5 days", status="active",
        ),
        Product(
            seller_id=6, name="Mango", category="Fruits",
            quantity_kg=300, price_per_kg=65, grade="A",
            harvest_date="2026-05-25", location="Kolhapur",
            image_url="https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80",
            farmer_name="Prakash Pawar", fpo_name="Ratnagiri Mango FPO",
            availability="1-2 days", status="active",
        ),
        Product(
            seller_id=7, name="Cauliflower", category="Vegetables",
            quantity_kg=250, price_per_kg=30, grade="A",
            harvest_date="2026-09-01", location="Pune",
            image_url="https://images.unsplash.com/photo-1568584711075-3d9217d9e5e0?w=400&q=80",
            farmer_name="Meena Kale", fpo_name="Pune Fresh FPO",
            availability="1-2 days", status="active",
        ),
        Product(
            seller_id=8, name="Mustard", category="Pulses",
            quantity_kg=900, price_per_kg=55, grade="B",
            harvest_date="2026-03-20", location="Nagpur",
            image_url="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80",
            farmer_name="Ravi Chavan", fpo_name="Vidarbha Oilseed FPO",
            availability="4-6 days", status="active",
        ),
    ]
    db.add_all(products)
    db.flush()

    # ── DEMO ORDER ──
    order = Order(
        order_ref="CM-20260842",
        buyer_id=10,  # FreshMart
        status="Order Placed",
        total_amount=11650,
        logistics_fee=450,
        delivery_address="FreshMart Warehouse, Pune",
        delivery_name="FreshMart Wholesale",
        delivery_phone="9876543219",
        payment_method="upi",
        payment_status="completed",
    )
    db.add(order)
    db.flush()

    order_item = OrderItem(
        order_id=order.id,
        product_id=1,  # Tomato
        product_name="Tomato",
        quantity_kg=400,
        unit_price=28,
    )
    db.add(order_item)

    payment = Payment(
        order_id=order.id,
        amount=11650,
        method="upi",
        status="completed",
        transaction_ref="TXN-CM-20260842",
    )
    db.add(payment)

    # ── MARKET PRICES ──
    market_prices = [
        MarketPrice(crop="tomato", location="Nashik", price=28),
        MarketPrice(crop="potato", location="Pune", price=18),
        MarketPrice(crop="onion", location="Nashik", price=22),
        MarketPrice(crop="wheat", location="Aurangabad", price=24),
        MarketPrice(crop="rice", location="Kolhapur", price=42),
        MarketPrice(crop="mango", location="Kolhapur", price=65),
        MarketPrice(crop="cauliflower", location="Pune", price=30),
        MarketPrice(crop="mustard", location="Nagpur", price=55),
    ]
    db.add_all(market_prices)

    # ── DEMAND FORECASTS ──
    forecasts = [
        DemandForecast(crop="tomato", location="Maharashtra", current_demand=820, predicted_demand=1050, trend_pct=27, confidence=87, recommendation="Increase supply"),
        DemandForecast(crop="potato", location="Maharashtra", current_demand=620, predicted_demand=700, trend_pct=13, confidence=82, recommendation="Maintain supply"),
        DemandForecast(crop="onion", location="Maharashtra", current_demand=1100, predicted_demand=980, trend_pct=-11, confidence=79, recommendation="Reduce excess listing"),
        DemandForecast(crop="wheat", location="Maharashtra", current_demand=2400, predicted_demand=2650, trend_pct=10, confidence=85, recommendation="Slight increase"),
        DemandForecast(crop="rice", location="Maharashtra", current_demand=1800, predicted_demand=1950, trend_pct=8, confidence=81, recommendation="Maintain supply"),
        DemandForecast(crop="mango", location="Maharashtra", current_demand=420, predicted_demand=510, trend_pct=21, confidence=88, recommendation="Increase supply"),
    ]
    db.add_all(forecasts)

    db.commit()
    db.close()
    print("[OK] Database seeded successfully!")
    print()
    print("Demo accounts:")
    print("  Farmer:   ramesh@cropmart.in / demo123")
    print("  FPO:      nashikfpo@cropmart.in / demo123")
    print("  Buyer:    freshmart@cropmart.in / demo123")
    print("  Consumer: priya@cropmart.in / demo123")


if __name__ == "__main__":
    seed()
