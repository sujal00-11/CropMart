"""
CropMart — Products API
CRUD for marketplace products with filtering, search, and sort.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List

from app.database import get_db
from app.models.product import Product
from app.models.user import User
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.core.security import get_current_user, get_optional_user

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("", response_model=List[ProductResponse])
def list_products(
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    location: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    sort: Optional[str] = Query(None),  # price-asc, price-desc, qty-desc
    seller_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    q = db.query(Product).filter(Product.status == "active")

    if search:
        q = q.filter(
            (Product.name.ilike(f"%{search}%")) |
            (Product.farmer_name.ilike(f"%{search}%"))
        )
    if category:
        q = q.filter(Product.category == category)
    if location:
        q = q.filter(Product.location == location)
    if min_price is not None:
        q = q.filter(Product.price_per_kg >= min_price)
    if max_price is not None:
        q = q.filter(Product.price_per_kg <= max_price)
    if seller_id is not None:
        q = q.filter(Product.seller_id == seller_id)

    if sort == "price-asc":
        q = q.order_by(Product.price_per_kg.asc())
    elif sort == "price-desc":
        q = q.order_by(Product.price_per_kg.desc())
    elif sort == "qty-desc":
        q = q.order_by(Product.quantity_kg.desc())
    else:
        q = q.order_by(Product.created_at.desc())

    return q.all()


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("", response_model=ProductResponse)
def create_product(
    data: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role not in ("farmer", "fpo"):
        raise HTTPException(status_code=403, detail="Only farmers and FPOs can list produce")

    product = Product(
        seller_id=current_user.id,
        name=data.name,
        category=data.category,
        quantity_kg=data.quantity_kg,
        price_per_kg=data.price_per_kg,
        grade=data.grade,
        harvest_date=data.harvest_date,
        location=data.location or current_user.location or "",
        image_url=data.image_url,
        availability=data.availability,
        farmer_name=data.farmer_name or current_user.name,
        fpo_name=data.fpo_name or (current_user.name if current_user.role == "fpo" else ""),
        status="active",
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.patch("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    data: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only update your own products")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product


@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only delete your own products")

    db.delete(product)
    db.commit()
    return {"message": "Product deleted"}
