# Tasks: Skeleton Loaders + Loading States

**Change**: 2026-05-04-skeleton-loaders

---

### Task 1: Agregar loading/error/retry a BookContext
**ID**: 1.1
**Status**: completed

**Checklist**:
- [x] Agregar `loading: boolean` al estado
- [x] Agregar `error: string | null` al estado
- [x] Agregar `retry()` que llama a fetchBooks
- [x] fetchBooks: loading=true al inicio, false al final
- [x] fetchBooks: guardar mensaje de error en estado
- [x] Exponer loading, error, retry en el context value

---

### Task 2: Crear componente SkeletonCard
**ID**: 1.2
**Status**: completed

**Checklist**:
- [x] Crear `components/SkeletonCard.tsx`
- [x] Usar Tailwind `animate-pulse` + formas rounded
- [x] Simular estructura de un BookItem (título, autor, botones)

---

### Task 3: Actualizar BookList con estados
**ID**: 1.3
**Status**: completed

**Checklist**:
- [x] loading → 3 SkeletonCards
- [x] error → mensaje + botón Reintentar
- [x] books=[] → "Tu biblioteca está vacía. ¡Agrega tu primer libro!"
- [x] books>0 → lista normal (sin cambios)

---

### Task 4: Actualizar tests
**ID**: 1.4
**Status**: completed

**Checklist**:
- [x] Actualizar BookList tests para nuevos estados
- [x] Test: BookList muestra skeletons durante loading
- [x] Test: BookList muestra error con botón reintentar
- [x] 8/8 tests pasan
- [ ] S2/S3 sin test (pendiente MSW para mockear API)

---

### Task 5: Commit + Push
**ID**: 1.5
**Status**: completed
