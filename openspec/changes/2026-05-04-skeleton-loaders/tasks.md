# Tasks: Skeleton Loaders + Loading States

**Change**: 2026-05-04-skeleton-loaders

---

### Task 1: Agregar loading/error/retry a BookContext
**ID**: 1.1
**Status**: pending

**Checklist**:
- [ ] Agregar `loading: boolean` al estado
- [ ] Agregar `error: string | null` al estado
- [ ] Agregar `retry()` que llama a fetchBooks
- [ ] fetchBooks: loading=true al inicio, false al final
- [ ] fetchBooks: guardar mensaje de error en estado
- [ ] Exponer loading, error, retry en el context value

---

### Task 2: Crear componente SkeletonCard
**ID**: 1.2
**Status**: pending

**Checklist**:
- [ ] Crear `components/SkeletonCard.tsx`
- [ ] Usar Tailwind `animate-pulse` + formas rounded
- [ ] Simular estructura de un BookItem (título, autor, botones)

---

### Task 3: Actualizar BookList con estados
**ID**: 1.3
**Status**: pending

**Checklist**:
- [ ] loading → 3 SkeletonCards
- [ ] error → mensaje + botón Reintentar
- [ ] books=[] → "Tu biblioteca está vacía. ¡Agrega tu primer libro!"
- [ ] books>0 → lista normal (sin cambios)

---

### Task 4: Actualizar tests
**ID**: 1.4
**Status**: pending

**Checklist**:
- [ ] Actualizar setup.tsx (nuevas props de contexto)
- [ ] Test: BookList muestra skeletons durante loading
- [ ] Test: BookList muestra estado vacío real
- [ ] Test: BookList muestra error con botón reintentar
- [ ] Verificar tests existentes pasan

---

### Task 5: Commit + Push
**ID**: 1.5
**Status**: pending
