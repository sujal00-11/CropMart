"""
CropMart — Bulk Requirements API
Create, list, and get matching farmers for bulk requirements.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.market import BulkRequirement
from app.models.user import User
from app.schemas.market import BulkRequirementCreate, BulkRequirementResponse, MatchResponse
from app.services.ai.matching import get_buyer_matches
from app.core.security import get_current_user

router = APIRouter(prefix="/requirements", tags=["Requirements"])


@router.post("", response_model=BulkRequirementResponse)
def create_requirement(
    data: BulkRequirementCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    req = BulkRequirement(
        buyer_id=current_user.id,
        product_name=data.product_name,
        quantity_kg=data.quantity_kg,
        max_price=data.max_price,
        location=data.location,
        required_date=data.required_date,
        status="open",
    )
    db.add(req)
    db.commit()
    db.refresh(req)
    return req


@router.get("", response_model=List[BulkRequirementResponse])
def list_requirements(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(BulkRequirement)
        .filter(BulkRequirement.buyer_id == current_user.id)
        .order_by(BulkRequirement.created_at.desc())
        .all()
    )


@router.get("/{req_id}/matches", response_model=MatchResponse)
def get_requirement_matches(
    req_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    req = db.query(BulkRequirement).filter(BulkRequirement.id == req_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Requirement not found")

    # Use AI matching service (in Phase 1, returns seeded data)
    return get_buyer_matches(req.product_name, sort_by="score")
