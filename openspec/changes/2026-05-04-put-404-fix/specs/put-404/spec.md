# Delta Spec: PUT 404

**Capability**: put-404
**Change**: 2026-05-04-put-404-fix

## Requirements

### R1: PUT a ID inexistente retorna 404
Cuando se hace PUT a un book_id que no existe en la base de datos, la API debe retornar 404 Not Found.

## Scenarios

### S1: PUT a ID inexistente → 404
**Given** no existe un libro con id "fake-999"
**When** se hace PUT /books/fake-999 con datos válidos
**Then** retorna 404

### S2: PUT a ID existente → 200
**Given** existe un libro con id "abc-123"
**When** se hace PUT /books/abc-123 con datos nuevos
**Then** retorna 200 con datos actualizados (sin cambios vs antes)
