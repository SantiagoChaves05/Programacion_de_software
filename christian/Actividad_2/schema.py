from pydantic import BaseModel
from typing import Optional

class AprendizCrear(BaseModel):
    nombre: str
    documento : str
    programa: str 

class AprendizRespueta(AprendizCrear):
    id : int

    class Config:
        from_atributes = True 

class AprendizActualizar(BaseModel):
    nombre : Opional[str] = None
    programa : Opional[str] = None
        