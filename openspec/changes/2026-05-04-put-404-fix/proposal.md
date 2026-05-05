# Proposal: PUT 404 Fix

**Change**: 2026-05-04-put-404-fix

## Intent
Corregir bug: PUT /books/{id} retornaba 200 aunque el libro no existiera (falsa confirmación). Ahora retorna 404, consistente con DELETE.

## Scope
- ✅ `book_service.update()` retorna `None` si no hay filas afectadas
- ✅ Router lanza `HTTPException(404)` cuando el service retorna None
- ✅ Test agregado: `test_actualizar_libro_inexistente_retorna_404`
