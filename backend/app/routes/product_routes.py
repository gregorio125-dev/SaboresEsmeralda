from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.controllers.product_controller import (
    create_product,
    get_products,
    get_product,
    update_product,
    delete_product
)

from app.schemas.product_schema import ProductCreate


router = APIRouter(prefix="/api/products", tags=["Products"])


# CREAR PRODUCTO
@router.post("/")
def create(data: ProductCreate, db: Session = Depends(get_db)):
    return create_product(data.dict(), db)


# LISTAR PRODUCTOS
@router.get("/")
def list_products(db: Session = Depends(get_db)):
    return get_products(db)


# OBTENER PRODUCTO
@router.get("/{product_id}")
def get(product_id: int, db: Session = Depends(get_db)):
    return get_product(product_id, db)


# ACTUALIZAR PRODUCTO
@router.put("/{product_id}")
def update(product_id: int, data: ProductCreate, db: Session = Depends(get_db)):
    return update_product(product_id, data.dict(), db)


# ELIMINAR PRODUCTO
@router.delete("/{product_id}")
def delete(product_id: int, db: Session = Depends(get_db)):
    return delete_product(product_id, db)