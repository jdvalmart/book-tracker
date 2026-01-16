from pydantic import BaseModel
from typing import Optional

class BookBase(BaseModel):
    title: str
    autor: str
    read: Optional[bool] = False

class BookCreate(BookBase):
    pass

class Book(BookBase):
    id: str
