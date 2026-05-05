# Tasks: Refactor Backend Layers

**Change**: 2026-05-04-refactor-backend-layers

---

### Task 1: Crear services/book_service.py
**ID**: 1.1
**Status**: completed

**Checklist**:
- [x] Función `get_all()` — retorna todos los libros
- [x] Función `create(data)` — inserta un libro, retorna dict con id
- [x] Función `update(book_id, data)` — actualiza un libro, None si no existe
- [x] Función `delete(book_id)` — elimina, retorna bool

---

### Task 2: Crear routers/books.py
**ID**: 1.2
**Status**: completed

**Checklist**:
- [x] Crear APIRouter con prefix="/books"
- [x] GET "" — delega a book_service.get_all()
- [x] POST "" — valida schema, delega a book_service.create()
- [x] PUT "/{book_id}" — delega a book_service.update(), 404 si no existe
- [x] DELETE "/{book_id}" — delega a book_service.delete(), 404 si no existe

---

### Task 3: Simplificar main.py
**ID**: 1.3
**Status**: completed

**Checklist**:
- [x] Migrar on_event → lifespan
- [x] Eliminar funciones de endpoints (movidas al router)
- [x] Registrar router con app.include_router()
- [x] Verificar ~25 líneas de código (docstring compacto)

---

### Task 4: Crear __init__.py
**ID**: 1.4
**Status**: completed

**Checklist**:
- [x] Crear routers/__init__.py
- [x] Crear services/__init__.py

---

### Task 5: Commit + Push
**ID**: 1.5
**Status**: completed

**Checklist**:
- [x] Commit: feat: refactor backend to layered architecture
- [x] Push a GitHub
