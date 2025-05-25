from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Abbreviation(Base):
    __tablename__ = "abbreviation"

    id = Column(Integer, primary_key=True, index=True)
    short = Column(String, unique=True, nullable=False)
    description = Column(Text)

    usages = relationship("Usage", back_populates="abbreviation", cascade="all, delete")

class Usage(Base):
    __tablename__ = "usage"

    id = Column(Integer, primary_key=True, index=True)
    example = Column(Text)
    abbreviation_id = Column(Integer, ForeignKey("abbreviation.id", ondelete="CASCADE"))

    abbreviation = relationship("Abbreviation", back_populates="usages")
