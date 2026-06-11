# Tasks: Dark Mode

**Change**: 2026-05-05-dark-mode

### Task 1: Configurar Tailwind y anti-FOUC
**ID**: 1.1 | **Status**: completed
- [x] Agregar `@custom-variant dark` en index.css
- [x] Agregar script anti-FOUC en index.html `<head>`

### Task 2: Crear ThemeContext
**ID**: 1.2 | **Status**: completed
- [x] Contexto con `isDark` y `toggle`
- [x] Persistencia en localStorage
- [x] Sincronizar clase `dark` en `<html>`
- [x] Hook `useTheme` con guard clause

### Task 3: Botón toggle en App.tsx
**ID**: 1.3 | **Status**: completed
- [x] Envolver en ThemeProvider
- [x] Botón 🌙/☀️ en header

### Task 4: dark: variants en componentes
**ID**: 1.4 | **Status**: completed
- [x] App.tsx, BookForm, BookList, BookItem, ReadingStats, SkeletonCard
- [ ] Toast.tsx pendiente (bajo impacto — colores fijos funcionan)

### Task 5: Tests + Commit
**ID**: 1.5 | **Status**: completed
- [x] 10 tests pasan, build exitoso
