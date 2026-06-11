# Delta Spec: Dark Mode

**Capability**: dark-mode
**Change**: 2026-05-05-dark-mode
**Status**: active

## Requirements

### R1: Toggle manual
El usuario puede alternar entre modo claro y oscuro con un botón en el header.

### R2: Preferencia persistente
La elección se guarda en localStorage y se restaura al recargar la página.

### R3: Sin flash al recargar
No hay FOUC (flash of unstyled content) — el script inline en `<head>` aplica la clase `dark` antes de que React monte.

### R4: Default del sistema
Si no hay preferencia guardada, se respeta `prefers-color-scheme` del sistema operativo.

### R5: Todos los componentes adaptados
Cada componente tiene variantes `dark:` para texto, fondos, bordes y colores de estado.

## Scenarios

### S1: Toggle cambia el tema
**Given** el usuario está en modo claro
**When** hace clic en el botón de tema
**Then** la UI cambia a modo oscuro y el botón muestra ☀️

### S2: Preferencia persiste
**Given** el usuario selecciona dark mode
**When** recarga la página
**Then** la UI se muestra en dark mode sin flash blanco

### S3: Default del sistema
**Given** un usuario nuevo (sin preferencia guardada)
**When** su SO tiene dark mode activado
**Then** la UI se muestra en dark mode

### S4: Componentes legibles en dark mode
**Given** dark mode activado
**When** se renderizan BookForm, BookList, BookItem, ReadingStats, Toast
**Then** todos los textos son legibles, los fondos son oscuros, y los bordes son visibles
