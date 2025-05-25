import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Загружаем переменные окружения из .env
load_dotenv()

# Получаем строку подключения из окружения
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set! Проверь .env файл.")

# Подключение к PostgreSQL
engine = create_engine(DATABASE_URL)

# Сессия для взаимодействия с БД
SessionLocal = sessionmaker(bind=engine)

# Базовый класс для моделей
Base = declarative_base()
