from pydantic import BaseModel
from typing import List, Optional

# Схема для создания записи аббревиатуры
class AbbreviationCreate(BaseModel):
    short: str
    description: Optional[str] = None

# Схема для ответа (если нужно)
class AbbreviationOut(BaseModel):
    id: int
    short: str
    description: Optional[str]

    class Config:
        orm_mode = True

# Схема для способа применения
class UsageCreate(BaseModel):
    abbreviation_id: int
    example: str

class UsageOut(BaseModel):
    id: int
    example: str

    class Config:
        orm_mode = True
