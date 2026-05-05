# Proposal: Refactor Backend Layers

**Change**: 2026-05-04-refactor-backend-layers

## Intent

Separar el monolito `main.py` (73 líneas con 6 responsabilidades) en una arquitectura de 3 capas: routers (HTTP), services (lógica de negocio), y models/database (datos). Esto mejora testabilidad, mantenibilidad y sienta las bases para features futuras (GraphQL, IA).

## Scope

- ✅ Crear `backend/routers/books.py` con endpoints CRUD
- ✅ Crear `backend/services/book_service.py` con lógica de negocio
- ✅ Simplificar `main.py` a solo arranque y registro de routers
- ✅ Los 18 tests existentes deben seguir pasando sin cambios
- ✅ Migrar `on_event` deprecado a `lifespan` moderno
- ❌ No cambiar comportamiento de endpoints (misma API)
- ❌ No modificar schemas ni modelos

## Risks

| Riesgo | Mitigación |
|--------|-----------|
| Tests existentes se rompen | Los 18 tests deben pasar post-refactor — son nuestra red de seguridad |
| `databases` global vs inyección | Mantener `database` como singleton importado — refactor futuro para DI |
| Rutas POST/PUT usan `book.dict()` | Ya migrado a `model_dump()` en cambio anterior |
