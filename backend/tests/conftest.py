"""
Fixtures compartidas para todos los tests del backend.

- SQLite en memoria para tests de schemas (sin dependencia externa)
- Cliente HTTP async (ASGITransport) para tests de API
"""

import os
import pytest

# ⚠️ SQLite para tests — no depende de Docker ni PostgreSQL
# La URL sqlite:// usa aiosqlite, siempre disponible
TEST_DB_FILE = os.path.join(os.path.dirname(__file__), "test.db")
os.environ["DATABASE_URL"] = f"sqlite:///{TEST_DB_FILE}"

from httpx import ASGITransport, AsyncClient
from main import app
from database import database, engine, metadata


@pytest.fixture
def anyio_backend():
    """Backend async para pytest-asyncio (FastAPI usa asyncio)."""
    return "asyncio"


@pytest.fixture(autouse=True)
async def setup_db():
    """
    Crea tablas antes de cada test, las destruye después.

    'autouse=True' significa que se ejecuta automáticamente
    para TODOS los tests. Como usa SQLite, no hay riesgo de
    conflictos con otros tests concurrentes.
    """
    await database.connect()
    metadata.create_all(engine)
    yield
    metadata.drop_all(engine)
    await database.disconnect()


@pytest.fixture
async def client():
    """
    Cliente HTTP asíncrono para testear endpoints
    sin levantar un servidor real.
    """
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as ac:
        yield ac
