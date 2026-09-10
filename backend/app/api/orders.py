"""
CropMart — Orders API
Checkout, list orders, order detail, status update.
"""

import time
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.market import Payment
from app.models.user import User
from app.schemas.order import CheckoutRequest, OrderResponse, OrderItemResponse, StatusUpdate
from app.core.security import get_current_user

router = APIRouter(prefix="/orders", tags=["Orders"])

VALID_STATUSES = [
    "Order Placed",
    "Farmer Confirmed",
    "Produce Aggregated",
    "Picked Up",
    "In Transit",
    "Delivered",
]


@router.post("/checkout", response_model=OrderResponse)
def checkout(
    data: CheckoutRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not data.items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    # Calculate totals
    subtotal = sum(item.quantity_kg * item.unit_price for item in data.items)
    logistics_fee = max(50, round(subtotal * 0.04))
    total = subtotal + logistics_fee

    # Generate order reference
    order_ref = f"CM-{str(int(time.time()))[-8:]}"

    order = Order(
        order_ref=order_ref,
        buyer_id=current_user.id,
        status="Order Placed",
        total_amount=total,
        logistics_fee=logistics_fee,
        delivery_address=data.delivery_address,
        delivery_name=data.delivery_name,
        delivery_phone=data.delivery_phone,
        payment_method=data.payment_method,
        payment_status="completed",
    )
    db.add(order)
    db.flush()  # Get the order.id

    # Create order items
    order_items = []
    for item in data.items:
        oi = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            product_name=item.product_name,
            quantity_kg=item.quantity_kg,
            unit_price=item.unit_price,
        )
        db.add(oi)
        order_items.append(oi)

    # Create payment record
    payment = Payment(
        order_id=order.id,
        amount=total,
        method=data.payment_method,
        status="completed",
        transaction_ref=f"TXN-{order_ref}",
    )
    db.add(payment)

    db.commit()
    db.refresh(order)

    # Build response with items
    items_resp = []
    for oi in order_items:
        db.refresh(oi)
        items_resp.append(OrderItemResponse.model_validate(oi))

    resp = OrderResponse.model_validate(order)
    resp.items = items_resp
    return resp


@router.get("", response_model=List[OrderResponse])
def list_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    orders = db.query(Order).filter(Order.buyer_id == current_user.id).order_by(Order.created_at.desc()).all()
    result = []
    for order in orders:
        items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
        resp = OrderResponse.model_validate(order)
        resp.items = [OrderItemResponse.model_validate(oi) for oi in items]
        result.append(resp)
    return result


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
    resp = OrderResponse.model_validate(order)
    resp.items = [OrderItemResponse.model_validate(oi) for oi in items]
    return resp


@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: int,
    data: StatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if data.status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {VALID_STATUSES}")

    order.status = data.status
    db.commit()
    db.refresh(order)

    items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
    resp = OrderResponse.model_validate(order)
    resp.items = [OrderItemResponse.model_validate(oi) for oi in items]
    return resp
