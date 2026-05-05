# Design: Skeleton Loaders + Loading States

**Change**: 2026-05-04-skeleton-loaders

---

## Architecture

```
BookContext
├── + loading: boolean          ← true durante fetch
├── + error: string | null      ← mensaje si falla
├── + retry: () => void         ← reintentar fetch
│
BookList
├── loading=true  → <SkeletonCard /> × 3
├── error         → <ErrorState /> con botón Reintentar
├── books=[]      → <EmptyState /> con CTA
└── books>0       → <BookItem /> × n
```

## Files

### 1. `BookContext.tsx` — Agregar loading/error/retry

```typescript
interface BookContextType {
  books: Book[];
  loading: boolean;     // ← NUEVO
  error: string | null;  // ← NUEVO
  fetchBooks: () => void;
  retry: () => void;     // ← NUEVO
  addBook: (book: Omit<Book, "id">) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
}
```

### 2. `SkeletonCard.tsx` — NUEVO componente

```tsx
export const SkeletonCard = () => (
  <div className="animate-pulse flex justify-between items-center p-3 border rounded-lg">
    <div className="space-y-2 flex-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
    <div className="flex gap-2">
      <div className="h-8 w-16 bg-gray-200 rounded" />
      <div className="h-8 w-16 bg-gray-200 rounded" />
    </div>
  </div>
);
```

Tailwind `animate-pulse` hace todo el trabajo — sin CSS extra.

### 3. `BookList.tsx` — Lógica de estados

```tsx
if (loading) return <SkeletonList />
if (error) return <ErrorState message={error} onRetry={retry} />
if (books.length === 0) return <EmptyState />
return <BookItemsList />
```

---

## Decisions

| Decisión | Alternativa | Razón |
|----------|-------------|-------|
| `animate-pulse` nativo de Tailwind | CSS custom o librería externa | Cero dependencias, soporte universal |
| 3 skeletons fijos | Cantidad dinámica | Simple, suficiente para UX |
| `retry` como función separada | Llamar `fetchBooks` | Semántica clara para el botón Reintentar |
| Estados en BookList (no en App) | Lógica en App.tsx | BookList es dueño de su propia visualización |
