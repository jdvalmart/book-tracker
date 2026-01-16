
from sqlalchemy import Table, Column, String, Boolean
from database import metadata

books = Table(
    "books",
    metadata,
    Column("id", String, primary_key=True),
    Column("title", String, nullable=False),
    Column("autor", String, nullable=False),
    Column("read", Boolean, default=False),
)
