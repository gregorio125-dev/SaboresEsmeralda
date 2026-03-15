from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    descripcion: str
    precio: float
    stock: int
    activo: bool
    image: str


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True