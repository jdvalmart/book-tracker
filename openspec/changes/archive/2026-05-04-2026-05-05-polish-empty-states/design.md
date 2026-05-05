# Design: Polish Empty & Error States

**Change**: 2026-05-05-polish-empty-states

---

## Changes per file

### 1. `BookList.tsx` — Empty + Error states

```tsx
// Empty state
<div className="text-center py-8">
  <span className="text-5xl">📖</span>
  <p className="text-gray-600 text-lg mt-3">Tu biblioteca está vacía</p>
  <p className="text-gray-400 text-sm mt-1">
    ¡Agrega tu primer libro usando el formulario!
  </p>
</div>

// Error state — caja con borde
<div className="text-center py-6 px-4 border border-red-200 bg-red-50 rounded-lg">
  <span className="text-3xl">⚠️</span>
  <p className="text-red-700 mt-2">{error}</p>
  <button onClick={retry} className="mt-3 ...">Reintentar</button>
</div>
```

### 2. `BookForm.tsx` — Botón disabled

```tsx
const [submitting, setSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!title.trim() || !autor.trim()) return;
  setSubmitting(true);
  await addBook({ title, autor, read: false });  // ← ahora async
  setTitle("");
  setAutor("");
  setSubmitting(false);
};

// Button
<button disabled={submitting} ...>
  {submitting ? "Agregando..." : "Agregar Libro"}
</button>
```

### 3. `BookContext.tsx` — Toasts con emoji

```typescript
toast.success("📚 Libro agregado");
toast.success("🗑️ Libro eliminado");
toast.success("✅ Libro actualizado");
```

### 4. `App.tsx` — Contador de libros

```tsx
// Usar useBooks() para obtener books.length
// Mostrar debajo del título
{books.length > 0 && (
  <p className="text-sm text-gray-500 text-center mt-1">
    {books.length} {books.length === 1 ? "libro" : "libros"} en tu biblioteca
  </p>
)}
```

---

## Decisions

| Decisión | Alternativa | Razón |
|----------|-------------|-------|
| Emoji en vez de íconos SVG | Instalar react-icons/lucide | Cero dependencias, funciona en todos lados |
| `submitting` como estado local | Estado global en BookContext | Solo BookForm lo necesita |
| Contador en App.tsx | Componente separado | Una línea, no justifica archivo nuevo |
| `addBook` ahora async | Mantener fire-and-forget | Necesitamos saber cuándo termina para re-habilitar |
