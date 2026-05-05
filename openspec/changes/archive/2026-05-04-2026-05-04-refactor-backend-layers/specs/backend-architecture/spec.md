# Delta Spec: Backend Architecture

**Capability**: backend-architecture
**Change**: 2026-05-04-refactor-backend-layers
**Status**: active

---

## Requirements

### R1: main.py solo arranca la app
`main.py` no debe contener lógica de endpoints ni SQL. Solo crea la app FastAPI, configura CORS, registra routers y maneja el ciclo de vida.

### R2: Los endpoints viven en routers/
Cada grupo de endpoints relacionados (CRUD de libros) tiene su propio archivo en `routers/`.

### R3: La lógica de negocio vive en services/
Las operaciones de base de datos, reglas de negocio y transformaciones están en `services/`. Los routers solo reciben HTTP y delegan.

### R4: La API no cambia
Los mismos 5 endpoints (GET, POST, PUT, DELETE /books) deben responder exactamente igual que antes. Mismas URLs, mismos status codes, mismos response bodies.

### R5: Los tests existentes pasan sin cambios
Los 18 tests en `backend/tests/` deben seguir pasando — no se modifican los tests, solo se verifica que el refactor no rompe nada.

---

## Scenarios

### S1: GET /books funciona igual
**Given** la app refactorizada está corriendo
**When** se hace GET /books
**Then** retorna 200 con lista de libros (igual que antes)

### S2: POST /books funciona igual
**Given** la app refactorizada está corriendo
**When** se hace POST /books con datos válidos
**Then** retorna 200 con libro creado e id generado

### S3: DELETE /books/{id} funciona igual
**Given** un libro existe
**When** se hace DELETE /books/{id}
**Then** retorna 204 (igual que antes)

### S4: PUT /books/{id} funciona igual
**Given** un libro existe
**When** se hace PUT /books/{id} con datos nuevos
**Then** retorna 200 con datos actualizados

### S5: Tests existentes pasan
**Given** los 18 tests en tests/
**When** se ejecuta `pytest tests/ -v`
**Then** todos pasan sin modificaciones

### S6: main.py tiene < 30 líneas
**Given** el refactor completado
**When** se mide main.py
**Then** tiene menos de 30 líneas (vs 73 antes)
