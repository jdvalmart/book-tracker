from pydantic import BaseModel, Field
from typing import Optional

class BookBase(BaseModel):
    model_config = {"str_strip_whitespace": True}

    title: str = Field(..., min_length=1)
    autor: str = Field(..., min_length=1)
    read: Optional[bool] = False

class BookCreate(BookBase):
    pass

class Book(BookBase):
    id: str
