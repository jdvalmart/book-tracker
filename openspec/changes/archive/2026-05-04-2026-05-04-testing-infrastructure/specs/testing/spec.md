# Delta Spec: Testing Infrastructure

**Capability**: testing
**Change**: 2026-05-04-testing-infrastructure
**Status**: active

---

## Requirements

### R1: Backend test runner configured
`pytest` debe ejecutarse correctamente con soporte asíncrono y descubrir tests en el directorio `backend/tests/`.

- **Type**: infrastructure
- **Priority**: critical

### R2: Pydantic schema tests
Los tests deben validar que `BookCreate` rechaza entradas inválidas (título vacío, autor vacío, campos faltantes).

- **Type**: unit
- **Priority**: high

### R3: API endpoint tests
Los tests deben verificar que los 5 endpoints (GET, POST, PUT, DELETE, health) responden correctamente.

- **Type**: integration
- **Priority**: high

### R4: Frontend test runner configured
`vitest` debe ejecutarse correctamente y descubrir tests en `frontend/src/`.

- **Type**: infrastructure
- **Priority**: critical

### R5: Component rendering tests
Los tests deben verificar que `BookForm` y `BookList` renderizan correctamente.

- **Type**: unit
- **Priority**: medium

### R6: Context hook tests
Los tests deben verificar que `useBooks` lanza error si se usa fuera del Provider.

- **Type**: unit
- **Priority**: medium

---

## Scenarios

### Backend

#### S1: pytest ejecuta tests correctamente
**Given** pytest y pytest-asyncio están instalados
**When** se ejecuta `pytest backend/tests/ -v`
**Then** pytest descubre y ejecuta los tests, reportando resultados

#### S2: Schema rechaza título vacío
**Given** el módulo de schemas está importado
**When** se instancia `BookCreate(title="", autor="Test", read=False)`
**Then** se lanza `ValidationError`

#### S3: Schema acepta datos válidos
**Given** el módulo de schemas está importado
**When** se instancia `BookCreate(title="Clean Code", autor="Robert Martin", read=False)`
**Then** el objeto se crea exitosamente con los valores correctos

#### S4: GET /books retorna 200
**Given** la app FastAPI está corriendo con una DB de prueba
**When** se hace un GET a `/books`
**Then** la respuesta es 200 y el body es una lista (vacía o con datos)

#### S5: POST /books crea un libro
**Given** la app FastAPI está corriendo
**When** se hace un POST a `/books` con `{"title": "Test", "autor": "Me", "read": false}`
**Then** la respuesta es 200 y contiene el libro creado con un `id`

#### S6: DELETE /books/{id} retorna 204
**Given** un libro existe en la DB
**When** se hace un DELETE a `/books/{id}`
**Then** la respuesta es 204 y un GET posterior no encuentra el libro

### Frontend

#### S7: vitest ejecuta tests correctamente
**Given** vitest está instalado y configurado
**When** se ejecuta `npm run test -- --run`
**Then** vitest descubre y ejecuta los tests, reportando resultados

#### S8: BookForm renderiza campos
**Given** el componente BookForm está renderizado dentro de BookProvider
**When** se renderiza
**Then** existe un input con placeholder "Título del libro" y otro con placeholder "Autor"

#### S9: BookList muestra estado vacío
**Given** no hay libros en el contexto
**When** se renderiza BookList
**Then** muestra el texto "No hay libros aún"

#### S10: useBooks lanza error fuera del Provider
**Given** el hook useBooks se usa sin BookProvider ancestro
**When** se renderiza
**Then** se lanza un error con el mensaje "useBooks must be used within BookProvider"
