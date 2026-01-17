
import os
from databases import Database
from sqlalchemy import create_engine, MetaData

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL no está definido")

database = Database(DATABASE_URL)
metadata = MetaData()
engine = create_engine(DATABASE_URL)
