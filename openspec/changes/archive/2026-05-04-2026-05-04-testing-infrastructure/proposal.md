# Proposal: Testing Infrastructure

**Change**: 2026-05-04-testing-infrastructure

## Intent

Establecer la infraestructura de testing para todo el proyecto (backend + frontend). Esto es la base sobre la que se construirá todo el resto: refactors, features IA, mejoras UI. Sin tests, cada cambio es un riesgo.

## Scope

### Backend Testing (pytest + httpx)
- ✅ Instalar pytest, pytest-asyncio, httpx, pytest-cov
- ✅ Añadir tests de schemas Pydantic (validación de BookCreate)
- ✅ Añadir test de integración: GET /books retorna 200
- ✅ Añadir test de integración: POST /books crea un libro y retorna 201
- ✅ Añadir test de integración: PUT /books/{id} actualiza un libro
- ✅ Añadir test de integración: DELETE /books/{id} elimina y retorna 204
- ✅ Configurar base de datos de prueba (SQLite en memoria o PostgreSQL separado)
- ✅ Alcanzar mínimo 70% de coverage en backend
- ❌ No tests E2E (fase futura con Playwright)

### Frontend Testing (vitest + testing-library)
- ✅ Instalar vitest, @testing-library/react, jsdom, @testing-library/jest-dom
- ✅ Configurar vitest en vite.config.ts
- ✅ Añadir test de componente BookForm (renderiza, submit llama a addBook)
- ✅ Añadir test de componente BookList (estado vacío, estado con libros)
- ✅ Añadir test del hook useBooks (contexto)
- ✅ Alcanzar mínimo 60% de coverage en frontend
- ❌ No tests con MSW (fase futura — mockear API completa)

## Risks

| Riesgo | Mitigación |
|--------|-----------|
| `databases` (legacy) incompatible con Python 3.14 | Si falla, migrar a SQLAlchemy async session directamente |
| PostgreSQL necesario para tests de integración | Usar SQLite en memoria para tests unitarios; docker-compose con DB de prueba para integración |
| Configuración de vitest en proyecto Vite existente | Verificar compatibilidad antes de instalar |

## Capabilities

Añade la capacidad `testing` al proyecto (actualmente ausente según `sdd-init`).
