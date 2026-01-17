
import os
from databases import Database
from sqlalchemy import create_engine, MetaData

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:postgres@db:5432/booktracker"
)

database = Database(DATABASE_URL)
engine = create_engine(DATABASE_URL)
metadata = MetaData()
