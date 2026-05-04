# Design: Testing Infrastructure

**Change**: 2026-05-04-testing-infrastructure  
**Date**: 2026-05-04

---

## Overview

Configurar pytest para backend y vitest para frontend. Escribir tests iniciales que cubran schemas, endpoints, componentes y hooks.

---

## Architecture

```
book-tracker/
├── backend/
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py          ← Fixtures compartidas (app, client, test DB)
│   │   ├── test_schemas.py      ← Tests de validación Pydantic
│   │   └── test_api.py          ← Tests de endpoints HTTP
│   ├── requirements.txt         ← + pytest pytest-asyncio httpx pytest-cov
│   └── pytest.ini               ← Configuración de pytest
│
├── frontend/
│   ├── src/
│   │   ├── __tests__/
│   │   │   ├── setup.ts         ← Configuración de testing-library
│   │   │   ├── BookForm.test.tsx
│   │   │   ├── BookList.test.tsx
│   │   │   └── BookContext.test.tsx
│   ├── vitest.config.ts         ← (o en vite.config.ts)
│   └── package.json             ← + vitest @testing-library/react jsdom @testing-library/jest-dom
```

---

## Backend Design

### 1. Dependencies (`requirements.txt`)
```
pytest>=8.0
pytest-asyncio>=0.24
httpx>=0.27
pytest-cov>=5.0
```

### 2. Test Database Strategy
Usar la misma base de datos PostgreSQL pero con tablas creadas/destruidas por test. Alternativa: SQLite en memoria.

**Decisión**: Usar PostgreSQL real vía docker-compose. Se añade un servicio `db-test` o se reusa el existente con una DB separada.

```python
# conftest.py
import pytest
from httpx import ASGITransport, AsyncClient
from main import app
from database import database, engine, metadata
from models import books

@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"

@pytest.fixture(autouse=True)
async def setup_db():
    # Crear tablas antes de cada test
    metadata.create_all(engine)
    yield
    # Limpiar después
    metadata.drop_all(engine)

@pytest.fixture
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac
```

### 3. Schema Tests (`test_schemas.py`)
```python
from schemas import BookCreate
from pydantic import ValidationError
import pytest

def test_book_create_valid():
    book = BookCreate(title="Clean Code", autor="Robert Martin", read=False)
    assert book.title == "Clean Code"

def test_book_create_empty_title():
    with pytest.raises(ValidationError):
        BookCreate(title="", autor="Test", read=False)

def test_book_create_whitespace_title():
    with pytest.raises(ValidationError):
        BookCreate(title="   ", autor="Test", read=False)

def test_book_create_missing_title():
    with pytest.raises(ValidationError):
        BookCreate(autor="Test", read=False)
```

### 4. API Tests (`test_api.py`)
```python
import pytest

@pytest.mark.anyio
async def test_get_books_empty(client):
    response = await client.get("/books")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.anyio
async def test_create_book(client):
    response = await client.post("/books", json={
        "title": "Test Book", "autor": "Me", "read": False
    })
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Book"
    assert "id" in data
```

---

## Frontend Design

### 1. Dependencies (`package.json`)
```json
{
  "devDependencies": {
    "vitest": "^3.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^25.0.0"
  }
}
```

### 2. Vitest Config (`vite.config.ts`)
Agregar sección `test` al vite.config.ts existente:
```typescript
/// <reference types="vitest/config" />
export default defineConfig({
  // ... plugins existentes
  test: {
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    globals: true,
  },
});
```

### 3. Testing Setup (`src/__tests__/setup.ts`)
```typescript
import "@testing-library/jest-dom/vitest";
```

### 4. Component Tests

**BookForm.test.tsx**:
```typescript
import { render, screen } from "@testing-library/react";
import { BookForm } from "../components/BookForm";
import { BookProvider } from "../context/BookContext";

test("renderiza campos de título y autor", () => {
  render(
    <BookProvider>
      <BookForm />
    </BookProvider>
  );
  expect(screen.getByPlaceholderText("Título del libro")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Autor")).toBeInTheDocument();
});
```

**BookList.test.tsx**:
```typescript
test("muestra estado vacío cuando no hay libros", () => {
  render(
    <BookProvider>
      <BookList />
    </BookProvider>
  );
  expect(screen.getByText("No hay libros aún")).toBeInTheDocument();
});
```

**BookContext.test.tsx**:
```typescript
test("useBooks lanza error fuera del Provider", () => {
  const TestComponent = () => {
    useBooks();
    return null;
  };
  expect(() => render(<TestComponent />)).toThrow(
    "useBooks must be used within BookProvider"
  );
});
```

---

## Decisions

| Decisión | Alternativa | Razón |
|----------|-------------|-------|
| PostgreSQL real para tests | SQLite en memoria | `databases` usa PostgreSQL features. SQLite difiere en comportamiento |
| `ASGITransport` en vez de levantar servidor | `TestClient` de Starlette | ASGITransport es más moderno, no requiere event loop separado |
| Sin MSW en esta fase | Mockear fetch con MSW | Complejidad innecesaria para tests iniciales. Context + datos mockeados bastan |
| Vitest config EN vite.config.ts | Archivo separado vitest.config.ts | Menos archivos, vite ya sabe fusionar configs |
