from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models
import schemas

# Инициализация
models.Base.metadata.create_all(bind=engine)
app = FastAPI()

# Зависимость для получения сессии БД
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ➕ Добавить аббревиатуру
@app.post("/abbreviations/", response_model=schemas.AbbreviationOut)
def create_abbreviation(abbr: schemas.AbbreviationCreate, db: Session = Depends(get_db)):
    db_abbr = models.Abbreviation(**abbr.dict())
    db.add(db_abbr)
    db.commit()
    db.refresh(db_abbr)
    return db_abbr

# ➕ Добавить пример использования
@app.post("/usages/", response_model=schemas.UsageOut)
def create_usage(usage: schemas.UsageCreate, db: Session = Depends(get_db)):
    # Проверка, что аббревиатура существует
    abbr = db.query(models.Abbreviation).filter(models.Abbreviation.id == usage.abbreviation_id).first()
    if not abbr:
        raise HTTPException(status_code=404, detail="Аббревиатура не найдена")
    
    db_usage = models.Usage(**usage.model_dump())
    db.add(db_usage)
    db.commit()
    db.refresh(db_usage)
    return db_usage
