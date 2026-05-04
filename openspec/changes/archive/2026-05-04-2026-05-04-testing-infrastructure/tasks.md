# Tasks: Testing Infrastructure

**Change**: 2026-05-04-testing-infrastructure  
**Date**: 2026-05-04

---

## Backend Tasks

### Task 1: Instalar dependencias de testing
**ID**: 1.1  
**Status**: completed  
**File**: `backend/requirements.txt`

**Checklist**:
- [x] Agregar `pytest`, `pytest-asyncio`, `httpx`, `pytest-cov` a requirements.txt
- [x] Ejecutar `pip install -r requirements.txt` (venv existente)
- [x] Agregar `pydantic>=2.0` explícito (estaba ausente, dependía de fastapi)

---

### Task 2: Crear configuración de pytest
**ID**: 1.2  
**Status**: completed  
**File**: `backend/pytest.ini`, `backend/tests/__init__.py`

**Checklist**:
- [x] Crear `backend/pytest.ini` con modo asyncio auto y directorio tests
- [x] Crear `backend/tests/__init__.py`
- [x] Verificar que pytest descubre el directorio (collects 0, sin errores)

---

### Task 3: Crear conftest.py con fixtures
**ID**: 1.3  
**Status**: completed  
**File**: `backend/tests/conftest.py`

**Checklist**:
- [x] Fixture `client` con AsyncClient + ASGITransport
- [x] Configurar `DATABASE_URL` con SQLite para tests (no depende de Docker)
- [x] Fixture `setup_db` que crea/destruye tablas por test (autouse)
- [x] Configurar `anyio_backend` = "asyncio"
- [x] Verificar que pytest carga conftest sin errores
- [x] Añadir `aiosqlite` como dependencia de testing

---

### Task 4: Escribir tests de schemas
**ID**: 1.4  
**Status**: completed  
**File**: `backend/tests/test_schemas.py`

**Checklist**:
- [x] 10 tests de validación Pydantic
- [x] 10/10 pasan ✅

---

### Task 5: Escribir tests de API endpoints
**ID**: 1.5  
**Status**: completed  
**File**: `backend/tests/test_api.py`

**Checklist**:
- [x] test_lista_vacia (GET /books)
- [x] test_lista_con_libros
- [x] test_crear_libro_valido (POST /books)
- [x] test_crear_libro_invalido_retorna_422
- [x] test_eliminar_libro_existente (DELETE 204)
- [x] test_eliminar_libro_inexistente (DELETE 404)
- [x] test_actualizar_libro_existente (PUT)
- [x] test_actualizar_libro_invalido_retorna_422
- [x] 8/8 pasan ✅ (SQLite)

---

## Frontend Tasks

### Task 6: Instalar dependencias de testing frontend
**ID**: 2.1  
**Status**: completed  
**File**: `frontend/package.json`

**Checklist**:
- [x] Instalar vitest, @testing-library/react, @testing-library/jest-dom, jsdom (vía bun)
- [x] Agregar scripts `"test": "vitest"` y `"test:run": "vitest run"` a package.json

---

### Task 7: Configurar vitest
**ID**: 2.2  
**Status**: completed  
**File**: `frontend/vite.config.ts`

**Checklist**:
- [x] Agregar `/// <reference types="vitest/config" />` al inicio
- [x] Agregar sección `test` con environment: jsdom, setupFiles, globals
- [x] Crear `frontend/src/__tests__/setup.ts` con import de jest-dom
- [x] vitest 4.1.5 funcionando ✅

---

### Task 8: Escribir test de BookForm
**ID**: 2.3  
**Status**: completed  
**File**: `frontend/src/__tests__/BookForm.test.tsx`

**Checklist**:
- [x] Test: renderiza input de título (S8)
- [x] Test: renderiza input de autor (S8)
- [x] Test: botón de submit está presente

---

### Task 9: Escribir test de BookList
**ID**: 2.4  
**Status**: completed  
**File**: `frontend/src/__tests__/BookList.test.tsx`

**Checklist**:
- [x] Test: muestra estado vacío cuando no hay libros (S9)

---

### Task 10: Escribir test de BookContext
**ID**: 2.5  
**Status**: completed  
**File**: `frontend/src/__tests__/BookContext.test.tsx`

**Checklist**:
- [x] Test: useBooks lanza error fuera del Provider (S10)

---

## Verification

### Task 11: Verificar coverage y ejecución
**ID**: 3.1  
**Status**: completed  

**Checklist**:
- [x] `pytest backend/tests/ -v` → 18/18 pasan ✅
- [x] `cd frontend && bun run vitest run` → 5/5 pasan ✅
- [x] Backend coverage: **93%** ✅ (target ≥ 70%)
- [x] Frontend coverage: **45%** ⚠️ (target ≥ 60% — pendiente mejorar con tests de contexto y BookItem)
