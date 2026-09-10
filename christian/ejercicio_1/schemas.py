from pydantic import BaseModel, Field


class HerramientaCreate(BaseModel):
    nombre: str = Field(..., min_length=1, description="Nombre de la herramienta")
    precio_compra: float = Field(..., gt=0, description="Precio de compra de la herramienta")
    anios_vida_util: int = Field(..., description="Años de vida útil estimados")


class HerramientaResponse(BaseModel):
    id: int
    nombre: str
    precio_compra: float
    anios_vida_util: int
    depreciacion_anual: float

    class Config:
        from_attributes = True  
