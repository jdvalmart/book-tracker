# Design: Dark Mode

**Change**: 2026-05-05-dark-mode

## Architecture

```
index.html          ← script anti-FOUC (antes de React)
index.css           ← @custom-variant dark
ThemeContext.tsx     ← estado + localStorage + toggle
App.tsx              ← ThemeProvider + botón toggle
Componentes          ← dark: variants en colores
```

## Color Mapping

| Elemento | Light | Dark |
|----------|-------|------|
| Fondo página | `bg-gray-100` | `dark:bg-gray-900` |
| Fondo cards | `bg-white` | `dark:bg-gray-800` |
| Fondo stats | `bg-gray-50` | `dark:bg-gray-700` |
| Texto principal | `text-gray-800` | `dark:text-gray-100` |
| Texto secundario | `text-gray-500/600` | `dark:text-gray-400` |
| Bordes | `border` | `dark:border-gray-600` |
| Input bg | `bg-white` | `dark:bg-gray-700` |
| Input text | default | `dark:text-gray-100` |
| Placeholder | default | `dark:placeholder-gray-400` |
| Botón azul | `bg-blue-600` | `dark:bg-blue-500` |
| Botón rojo | `bg-red-600` | `dark:bg-red-500` |
| Error bg | `bg-red-50` | `dark:bg-red-900/30` |
| Skeleton | `bg-gray-200` | `dark:bg-gray-600` |

## Files

### 1. `index.css` — Variant
```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
/* ... keep existing animations ... */
```

### 2. `index.html` — Anti-FOUC
```html
<script>
  if (localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
</script>
```

### 3. `ThemeContext.tsx` — NUEVO
Patrón idéntico a ToastContext: Provider + hook.

### 4. `App.tsx` — Toggle button
Botón en el header (🌙/☀️) que llama a `toggle()` del ThemeContext.

## Decisions

| Decisión | Alternativa | Razón |
|----------|-------------|-------|
| Context + localStorage | Solo media query | El usuario debe poder elegir |
| Script anti-FOUC en `<head>` | CSS-only | Tailwind v4 requiere clase en `<html>` antes del render |
| Variantes `dark:` individuales | CSS custom properties | Mantiene el patrón utility-first de Tailwind |
| Botón en header App | Componente separado | Una línea, no justifica archivo nuevo |
