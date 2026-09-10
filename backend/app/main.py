"""
CropMart — FastAPI Application Entry Point
Registers all routers, configures CORS, serves frontend static files.
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.config import settings
from app.database import engine, Base
from app.api import auth, products, orders, ai, requirements

# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CropMart API",
    description="AI-Powered Farm-to-Market Marketplace — Backend API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS — allow frontend to call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── API Routes ──
app.include_router(auth.router,         prefix="/api/v1")
app.include_router(products.router,     prefix="/api/v1")
app.include_router(orders.router,       prefix="/api/v1")
app.include_router(ai.router,           prefix="/api/v1")
app.include_router(requirements.router, prefix="/api/v1")


# ── Health Check ──
@app.get("/health", tags=["Health"])
def health():
    return {"status": "ok", "app": settings.APP_NAME, "version": "1.0.0"}


# ── Serve Frontend Static Files ──
frontend_dir = os.path.normpath(settings.FRONTEND_DIR)


@app.get("/", include_in_schema=False)
def serve_index():
    return FileResponse(os.path.join(frontend_dir, "index.html"))


# Serve static assets (CSS, JS, images)
if os.path.isdir(frontend_dir):
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")
