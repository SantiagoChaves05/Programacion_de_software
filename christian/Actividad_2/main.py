from fastapi import FastAPI, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session
import schema
import models
from database import engine
from database import SessionLocal

# Inyectar la sesión en la BD
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close

#Leer el archivo models y crear la base de datos con las tablas del archivo
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API con SQLAlchemy")

@app.get("/")
def raiz():
    return {"mensaje": "Base de datos generada con exito"}

@app.get("/aprendices", status_code=status.HTTP_200_OK, response_model=List[schema.AprendizRespuesta])
def obtener_aprendices(db: Session = Depends(get_db)):
    return db.query(models.Aprendiz).all()

@app.post("/aprendices", response_model=schema.AprendizRespuesta, status_code=status.HTTP_201_CREATED)
def crear_aprendiz(aprendiz: schema.AprendizCrear, db: Session = Depends(get_db)):

    aprendiz_existente = db.query(models.Aprendiz).filter(
        models.Aprendiz.documento == aprendiz.documento
    ).first()

    if aprendiz_existente:
        raise HTTPException(
            status_code = 400, #bad request
            detail="El documento ya fue registrado"
        )
    # Instanciar el objeto de SQLAlchemy
    nuevo_aprendiz = models.Aprendiz(**aprendiz.model_dump())
    db.add(nuevo_aprendiz)
    db.commit()
    db.refresh(nuevo_aprendiz)
    return nuevo_aprendiz

@app.post("/aprendices/masivo", status_code=status.HTTP_201_CREATED)
def crear_varios_aprendices(lista_aprendices: List[schema.AprendizCrear], db: Session = Depends(get_db)):
    nuevos_objetos = []

    for item in lista_aprendices:
        nuevo = models.Aprendiz(**item.model_dump())
        nuevos_objetos.append(nuevo)

    db.add_all(nuevos_objetos)
    db.commit()
    return {"mensaje": f"Se registraron {len(nuevos_objetos)} aprendices con exito"}

@app.put("/aprendices/{aprendiz_id}", response_model=schema.AprendizRespueta)
def ActuliazarAprendiz(aprendiz_id:int, datos_actualizados:schema.
AprendizActualizar, db: Session = Depends(get_db)):
    aprendiz = db.query(models.Aprendiz).filter(models.Aprendiz.id == aprendiz_id)
    first()

    if not aprendiz:
        raise HTTPException(
            status_code=status.HTTP_404_not_found,
            detail=f"No se encontro el aprendiz con el ID {aprendiz_id}"
        )
    datos_dict = datos_actualizados.model_dump(exclude_unset=True)

    for clave, valor in datos_dict.items():
        setattr(aprendiz, clave, valor)

    db.commit()
    db.refresh(aprendiz)

    return aprendiz

@app.delete("/aprendices/{aprendiz_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_aprendiz(aprendiz_id: int, db:Session =Depends(get_db)):
    aprendiz = db.query(models.Aprendiz). filter(models.Aprendiz.id ==aprendiz_id).first()
    if not aprendiz:
        raise HTTPException(
            status_code=status.HTTP_404_not_FOUND,
            detail=f"No se encontro "
        )