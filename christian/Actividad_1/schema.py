from pydantic import BaseModel

class AprendizCrear(BaseModel):
    nombre: str
    documento : str
    programa: str 

class AprendizRespueta(AprendizCrear):
    id : int

    class Config:
        from_atributes = True 

class AprendixActualizar(BaseModel):
    nombre : Opional[str] = None
    programa : Opional[str] = None
        