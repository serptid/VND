from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models
import schemas

# Создание таблиц при запуске
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Разрешение CORS (для фронтенда на другом порту, например, localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # или ["http://localhost:3000"] для безопасности
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Зависимость подключения к БД
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ➕ Добавление новой аббревиатуры
@app.post("/abbreviations/", response_model=schemas.AbbreviationOut)
def create_abbreviation(abbr: schemas.AbbreviationCreate, db: Session = Depends(get_db)):
    db_abbr = models.Abbreviation(**abbr.model_dump())
    db.add(db_abbr)
    db.commit()
    db.refresh(db_abbr)
    return db_abbr

# 📋 Получение всех аббревиатур
@app.get("/abbreviations/", response_model=list[schemas.AbbreviationOut])
def list_abbreviations(db: Session = Depends(get_db)):
    return db.query(models.Abbreviation).order_by(models.Abbreviation.id).all()

# 🔍 Поиск по аббревиатуре (например: ?query=дв)
@app.get("/abbreviations/search", response_model=list[schemas.AbbreviationOut])
def search_abbreviations(query: str, db: Session = Depends(get_db)):
    return db.query(models.Abbreviation)\
             .filter(models.Abbreviation.short.ilike(f"%{query}%"))\
             .order_by(models.Abbreviation.id).all()
