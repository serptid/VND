from database import Base, engine
import models  # обязательно импортировать, чтобы зарегистрировать модели

# Создание таблиц в БД
Base.metadata.create_all(bind=engine)
