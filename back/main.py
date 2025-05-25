from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models
import schemas
import os
import json
from contextlib import asynccontextmanager

# ─────────────────────
# Lifespan: запуск кода при старте
@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    load_from_json()  # Загрузка данных из JSON
    yield  # завершение lifespan (если что-то нужно при выходе)

app = FastAPI(lifespan=lifespan)

# ─────────────────────
# Разрешение CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ["http://localhost:3000"] — для фронта
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────
# Загрузка данных из JSON
def load_from_json():
    filepath = "abbreviations.json"
    if not os.path.exists(filepath):
        return

    try:
        with open(filepath, encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"❌ Ошибка чтения JSON: {e}")
        return

    db = SessionLocal()
    for item in data:
        short = item.get("short")
        description = item.get("description")
        example = item.get("example", "")

        if not short or not description:
            continue

        exists = db.query(models.Abbreviation).filter_by(short=short).first()
        if not exists:
            db.add(models.Abbreviation(short=short, description=description, example=example))

    db.commit()
    db.close()
    print("✅ Данные из JSON загружены.")

# ─────────────────────
# Подключение к БД
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ─────────────────────
# Добавление новой аббревиатуры
@app.post("/abbreviations/", response_model=schemas.AbbreviationOut)
def create_abbreviation(abbr: schemas.AbbreviationCreate, db: Session = Depends(get_db)):
    db_abbr = models.Abbreviation(**abbr.model_dump())
    db.add(db_abbr)
    db.commit()
    db.refresh(db_abbr)
    return db_abbr

# Получение всех аббревиатур
@app.get("/abbreviations/", response_model=list[schemas.AbbreviationOut])
def list_abbreviations(db: Session = Depends(get_db)):
    return db.query(models.Abbreviation).order_by(models.Abbreviation.id).all()

# Поиск по аббревиатуре
@app.get("/abbreviations/search", response_model=list[schemas.AbbreviationOut])
def search_abbreviations(query: str, db: Session = Depends(get_db)):
    return db.query(models.Abbreviation)\
             .filter(models.Abbreviation.short.ilike(f"%{query}%"))\
             .order_by(models.Abbreviation.id).all()
