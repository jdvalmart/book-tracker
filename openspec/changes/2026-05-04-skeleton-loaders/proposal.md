# Proposal: Skeleton Loaders + Loading States

**Change**: 2026-05-04-skeleton-loaders

## Intent

Agregar estados de carga visuales (skeleton loaders) para que el usuario sepa que la app está trabajando, en vez de ver un mensaje falso de "no hay libros" mientras carga. También mejorar el estado vacío real con un llamado a la acción.

## Scope

- ✅ Agregar `loading` y `error` al estado de BookContext
- ✅ Crear componente `SkeletonCard` (animación pulse con Tailwind)
- ✅ BookList: mostrar skeletons mientras `loading=true`
- ✅ BookList: mostrar estado vacío mejorado cuando `!loading && books.length === 0`
- ✅ BookList: mostrar mensaje de error cuando `error && !loading`
- ✅ Tests para los nuevos estados
- ❌ No modificar BookItem ni BookForm

## Risks

| Riesgo | Mitigación |
|--------|-----------|
| Cambios en BookContext rompen tests existentes | Actualizar setup.tsx custom render si es necesario |
| Skeleton animación no funciona en todos los navegadores | Usar `animate-pulse` de Tailwind — soporte universal |
