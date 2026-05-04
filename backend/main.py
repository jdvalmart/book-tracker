"""
Book Tracker API — FastAPI application.

Arquitectura en capas:
- routers/  → Capa HTTP (recibe requests, delega al service)
- services/ → Capa de negocio (lógica, SQL, reglas)
- models/   → Capa de datos (schema SQLAlchemy)
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import database
from routers import books


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Ciclo de vida de la aplicación.
    Reemplaza los deprecados @app.on_event("startup"/"shutdown").
    """
    await database.connect()
    yield
    await database.disconnect()


app = FastAPI(title="Book Tracker API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://book-tracker1.netlify.app", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(books.router)
