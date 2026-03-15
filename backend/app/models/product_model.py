from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from datetime import datetime
from app.config.database import Base


class Product(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    descripcion = Column(String)

    precio = Column(Float, nullable=False)
    stock = Column(Integer, default=0)

    activo = Column(Boolean, default=True)

    image = Column(String)

    creado_en = Column(DateTime, default=datetime.utcnow)