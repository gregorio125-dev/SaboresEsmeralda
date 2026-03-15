from sqlalchemy.orm import Session
from app.models.product_model import Product


# CREAR PRODUCTO
def create_product(data, db: Session):

    product = Product(
        name=data["name"],
        descripcion=data["descripcion"],
        precio=data["precio"],
        stock=data["stock"],
        activo=data["activo"],
        image=data["image"]
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


# LISTAR PRODUCTOS
def get_products(db: Session):
    return db.query(Product).all()


# OBTENER PRODUCTO POR ID
def get_product(product_id: int, db: Session):
    return db.query(Product).filter(Product.id == product_id).first()


# ACTUALIZAR PRODUCTO
def update_product(product_id: int, data, db: Session):

    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        return None

    product.name = data["name"]
    product.descripcion = data["descripcion"]
    product.precio = data["precio"]
    product.stock = data["stock"]
    product.activo = data["activo"]
    product.image = data["image"]

    db.commit()
    db.refresh(product)

    return product


# ELIMINAR PRODUCTO
def delete_product(product_id: int, db: Session):

    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        return None

    db.delete(product)
    db.commit()

    return {"message": "Producto eliminado"}