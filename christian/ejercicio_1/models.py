from sqlalchemy import Column, Integer, String, Float
from database import Base


class Herramienta(Base):
    __tablename__ = "herramientas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    precio_compra = Column(Float, nullable=False)
    anios_vida_util = Column(Integer, nullable=False)
    depreciacion_anual = Column(Float, nullable=False)
