from fastapi import FastAPI
from typing import List
from databse import obetner_conexion, inicializar_db
from schema import AprendizCrear,AprendizRespueta
import sqlite3

app = FastAPI(title="API con SQLite nativo")

inicializar_db()

@app.get("/")#decorador
def ruta_raiz():
    return{"mensaje" : "API Conecta a la BD"}

@app.get("/aprendices" , response_model= List[AprendizRespueta])
def obterner_aprendices():
    """
    Obtener todos los aprendices usando SELECT *
    """
    with  obtener_conexion()as cconexion:
        cursor = conexion.cursor()
        cursor.execute("SELECT * FROM aprendiz")
        filas = cursor.fetchall()
        return [dict(fila) for fila in filas]

@app.post("/aprendices", response_model=ApredizRespuesta,
status_code=status.HTTP_201_CREATED)
def vrear_aprendiz(aprendiz: AprendizCrear):
    with obtener_conexion() as conexion:
        cursor = conexion.cursor()
        try:
            query = "INSERT INTO aprendiz (nombre, documento, programa) VALUES (?, ?, ?)"
            cursro.execute(query, (aprendiz,nombre, aprendiz.documento,
            aprendiz.progrma))
            conexion.commit()

            #Obtener el id del nuevo aprendiz
            nuevo_id = cursor.lastrowid

            return {**aprendiz.model_dump(), "id": nuevo_id}

        except squlite3.IntegrityError:
            raise HTTPException(
                status_code=400, #400 bas request
                detail="El documento ingresado ya existe"
            )   