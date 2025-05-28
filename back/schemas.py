from pydantic import BaseModel

class AbbreviationCreate(BaseModel):
    short: str
    description: str
    example: str

class AbbreviationOut(BaseModel):
    id: int
    short: str
    description: str
    example: str

    class Config:
        from_attributes = True  # Pydantic 2.x
