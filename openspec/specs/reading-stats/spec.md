# Spec: Reading Stats

**Capability**: reading-stats
**Status**: stable

## Requirements

### R1: Tarjetas de estadísticas visibles
Cuando hay libros en la biblioteca, se muestran 4 tarjetas con: total, leídos, pendientes, y porcentaje con barra de progreso.

### R2: Datos derivados del contexto
Las estadísticas se calculan a partir de `useBooks().books`, sin estado local ni llamadas API adicionales.

### R3: Comportamiento con biblioteca vacía
Cuando `books.length === 0`, no se muestra el dashboard.

### R4: Actualización en tiempo real
Cuando se agrega, elimina o marca como leído un libro, las estadísticas se actualizan instantáneamente.

## Scenarios

### S1: Dashboard visible con datos
**Given** hay 5 libros (2 leídos, 3 pendientes)
**When** se renderiza la app
**Then** se muestran tarjetas con 5, 2, 3 y "40% leído" con barra al 40%

### S2: Biblioteca vacía oculta dashboard
**Given** no hay libros
**When** se renderiza la app
**Then** no se muestra el dashboard de estadísticas

### S3: Marcar como leído actualiza stats
**Given** hay 1 libro no leído
**When** el usuario lo marca como leído
**Then** el dashboard muestra 1 leído y 100% completado

### S4: 100% muestra barra verde completa
**Given** todos los libros están leídos
**When** se renderiza el dashboard
**Then** la barra de progreso está al 100% en verde
