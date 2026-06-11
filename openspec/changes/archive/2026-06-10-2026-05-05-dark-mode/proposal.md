# Proposal: Dark Mode

**Change**: 2026-05-05-dark-mode

## Intent
Implementar dark mode con toggle manual, persistencia en localStorage y respeto a la preferencia del sistema como default. Usar Tailwind v4 `dark:` variants sin dependencias externas.

## Scope
- ✅ ThemeContext (igual patrón que ToastContext)
- ✅ @custom-variant dark en CSS
- ✅ Script anti-FOUC en index.html
- ✅ Botón toggle (🌙/☀️) en header
- ✅ dark: variants en todos los componentes existentes
- ❌ Sin paleta de colores — usamos los defaults de Tailwind
