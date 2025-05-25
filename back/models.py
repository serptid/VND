from sqlalchemy import Column, Integer, String
from database import Base

class Abbreviation(Base):
    __tablename__ = "abbreviations"

    id = Column(Integer, primary_key=True, index=True)
    short = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=False)
    example = Column(String, nullable=True)
