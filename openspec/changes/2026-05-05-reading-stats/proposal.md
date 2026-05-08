# Proposal: Reading Statistics Dashboard

**Change**: 2026-05-05-reading-stats

## Intent
Agregar un dashboard de estadísticas de lectura derivado de los datos existentes. Muestra total de libros, leídos, pendientes y porcentaje de progreso en 4 tarjetas visuales con barra de progreso.

## Scope
- ✅ Componente `ReadingStats` que deriva datos de `useBooks()`
- ✅ 4 tarjetas: Total, Leídos, Pendientes, % Progreso
- ✅ Barra de progreso visual (Tailwind)
- ✅ Insertado entre BookCounter y BookForm en App.tsx
- ✅ Test unitario para el componente
- ❌ Sin dependencias externas (puro cálculo)
