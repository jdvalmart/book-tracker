# Design: Reading Statistics

**Change**: 2026-05-05-reading-stats

## Architecture

```
App.tsx
├── BookCounter          ← "X libros en tu biblioteca"
├── ReadingStats (NUEVO) ← Tarjetas de stats + barra progreso
├── BookForm
└── BookList
```

## Component: ReadingStats

```tsx
const ReadingStats = () => {
  const { books } = useBooks();

  if (books.length === 0) return null;  // Ocultar si no hay libros

  const total = books.length;
  const read = books.filter(b => b.read).length;
  const unread = total - read;
  const percent = Math.round((read / total) * 100);

  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      <StatCard label="Total" value={total} emoji="📚" />
      <StatCard label="Leídos" value={read} emoji="✅" />
      <StatCard label="Pendientes" value={unread} emoji="📖" />
      <div className="...">
        <div className="text-2xl font-bold">{percent}%</div>
        <div className="text-xs text-gray-500">completado</div>
        <div className="h-2 bg-gray-200 rounded mt-1">
          <div className="h-full bg-green-600 rounded" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
};
```

## Edge Cases

| Caso | Comportamiento |
|------|---------------|
| `books.length === 0` | `return null` — no renderiza nada |
| `percent === 0` | Barra vacía, color gris |
| `percent === 100` | Barra verde completa |
| División por cero | `read / total` con `total > 0` garantizado por el guard |

## Decisions

| Decisión | Alternativa | Razón |
|----------|-------------|-------|
| Componente directo (no custom hook) | `useReadingStats` hook separado | Solo se usa en un lugar — no justifica abstracción |
| `return null` cuando vacío | Mostrar stats en cero | Si no hay libros, no hay nada que medir |
| grid-cols-4 | Flexbox | 4 columnas simétricas — grid es más limpio |
| `Math.round` para porcentaje | Decimales | Enteros son más legibles en dashboard |
