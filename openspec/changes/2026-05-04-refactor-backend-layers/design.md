# Design: Refactor Backend Layers

**Change**: 2026-05-04-refactor-backend-layers

---

## Architecture: Before → After

```
ANTES                          DESPUÉS
backend/                       backend/
├── main.py (73 líneas)        ├── main.py (<30 líneas)
├── schemas.py                 ├── routers/
├── models.py                  │   └── books.py
├── database.py                ├── services/
│                              │   └── book_service.py
                               ├── schemas.py
                               ├── models.py
                               └── database.py
```

## Files

### 1. `backend/services/book_service.py` (NUEVO)

Contiene toda la lógica CRUD. Cada función recibe lo mínimo necesario y retorna datos limpios.

```python
from database import database
from models import books
from uuid import uuid4

async def get_all() -> list:
    query = books.select()
    return await database.fetch_all(query)

async def create(data: dict) -> dict:
    book_id = str(uuid4())
    query = books.insert().values(id=book_id, **data)
    await database.execute(query)
    return {"id": book_id, **data}

async def update(book_id: str, data: dict) -> dict:
    query = books.update().where(books.c.id == book_id).values(**data)
    await database.execute(query)
    return {"id": book_id, **data}

async def delete(book_id: str) -> bool:
    query = books.delete().where(books.c.id == book_id)
    result = await database.execute(query)
    return result > 0
```

### 2. `backend/routers/books.py` (NUEVO)

Solo recibe HTTP, llama al service, responde.

```python
from fastapi import APIRouter, HTTPException
from schemas import BookCreate, Book
from services import book_service

router = APIRouter(prefix="/books", tags=["books"])

@router.get("/", response_model=list[Book])
async def get_books():
    return await book_service.get_all()

@router.post("/", response_model=Book)
async def create_book(book: BookCreate):
    return await book_service.create(book.model_dump())

@router.put("/{book_id}", response_model=Book)
async def update_book(book_id: str, book: BookCreate):
    return await book_service.update(book_id, book.model_dump())

@router.delete("/{book_id}", status_code=204)
async def delete_book(book_id: str):
    deleted = await book_service.delete(book_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Book not found")
```

### 3. `backend/main.py` (MODIFICADO)

Solo arranque, CORS, lifespan, registro de routers.

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import database
from routers import books

@asynccontextmanager
async def lifespan(app: FastAPI):
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
```

---

## Decisions

| Decisión | Alternativa | Razón |
|----------|-------------|-------|
| `APIRouter` vs funciones sueltas | Definir rutas en main.py | APIRouter permite prefix, tags, y agrupar endpoints relacionados |
| Service recibe `dict` no `BookCreate` | Pasar el modelo Pydantic | El service no debería acoplarse a schemas HTTP |
| `model_dump()` en el router | Pasar Pydantic al service | Separación clara: router conoce HTTP/schemas, service conoce datos |
| `lifespan` vs `on_event` | Mantener on_event | FastAPI deprecó on_event — migrar ahora evita breaking changes futuros |
| Singleton `database` vs DI | Inyectar database en services | Refactor futuro. Mantener compatibilidad con tests existentes |
