from sqlalchemy import Column, Integer, String
from database import Base

class Aprendiz(Base):
    __tablename__ = "aprendices"

    #Definir las columnas
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    documento = Column(String, unique=True, index=True)
    programa = Column(String)

class Instructor(Base):
    __tablename__ = "instructores"

    #Definir las columnas
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    documento = Column(String, unique=True, index=True)
    coordinacion = Column(String)

class Ficha(Base):
    __tablename__ = "Fichas"

    #Definir las columnas
    id = Column(Integer, primary_key=True, index=True)
    programa = Column(String)
    aprendices = Column(Integer)