from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from database import Base, engine, get_db
from models import Herramienta
from schemas import HerramientaCreate, HerramientaResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API de Registro de Herramientas")


@app.post(
    response_model=HerramientaResponse,
    status_code=201,
    summary="Registrar una nueva herramienta y calcular su depreciación anual",
)
def crear_herramienta(payload: HerramientaCreate, db: Session = Depends(get_db)):
    if payload.anios_vida_util <= 0:
        raise HTTPException(
            status_code=400,
            detail="anios_vida_util debe ser mayor a 0 para calcular la depreciación.",
        )

    depreciacion_anual = payload.precio_compra / payload.anios_vida_util

    nueva_herramienta = Herramienta(
        nombre=payload.nombre,
        precio_compra=payload.precio_compra,
        anios_vida_util=payload.anios_vida_util,
        depreciacion_anual=depreciacion_anual,
    )

    db.add(nueva_herramienta)
    db.commit()
    db.refresh(nueva_herramienta)

    return nueva_herramienta


@app.get(
    response_model=list[HerramientaResponse],
    summary="Listar todas las herramientas registradas",
)
def listar_herramientas(db: Session = Depends(get_db)):
    return db.query(Herramienta).all()
