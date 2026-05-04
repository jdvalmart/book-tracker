# Tasks: Refactor Backend Layers

**Change**: 2026-05-04-refactor-backend-layers

---

### Task 1: Crear services/book_service.py
**ID**: 1.1
**Status**: pending

**Checklist**:
- [ ] Función `get_all()` — retorna todos los libros
- [ ] Función `create(data)` — inserta un libro, retorna dict con id
- [ ] Función `update(book_id, data)` — actualiza un libro
- [ ] Función `delete(book_id)` — elimina, retorna bool

---

### Task 2: Crear routers/books.py
**ID**: 1.2
**Status**: pending

**Checklist**:
- [ ] Crear APIRouter con prefix="/books"
- [ ] GET "/" — delega a book_service.get_all()
- [ ] POST "/" — valida schema, delega a book_service.create()
- [ ] PUT "/{book_id}" — delega a book_service.update()
- [ ] DELETE "/{book_id}" — delega a book_service.delete(), 404 si no existe

---

### Task 3: Simplificar main.py
**ID**: 1.3
**Status**: pending

**Checklist**:
- [ ] Migrar on_event → lifespan
- [ ] Eliminar funciones de endpoints (movidas al router)
- [ ] Registrar router con app.include_router()
- [ ] Verificar < 30 líneas

---

### Task 4: Crear __init__.py
**ID**: 1.4
**Status**: pending

**Checklist**:
- [ ] Crear routers/__init__.py
- [ ] Crear services/__init__.py

---

### Task 5: Commit + Push
**ID**: 1.5
**Status**: pending

**Checklist**:
- [ ] Commit: feat: refactor backend to layered architecture
- [ ] Push a GitHub
