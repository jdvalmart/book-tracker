# Spec: UI Loading States

**Capability**: ui-loading-states

---

## Requirements

### R1: BookContext expone estado de carga
El contexto debe exponer `loading: boolean` que sea `true` durante fetchBooks y se resetee al terminar.

### R2: Skeleton cards visibles durante carga
Mientras `loading === true`, BookList muestra 3 skeleton cards animadas en vez del mensaje de vacío.

### R3: Estado vacío real con CTA
Cuando `!loading && books.length === 0`, muestra un mensaje amigable con botón que dirige al formulario.

### R4: Estado de error visible
Cuando ocurre un error en fetchBooks, BookList muestra un mensaje de error con botón de reintentar.

---

## Scenarios

### S1: Carga inicial muestra skeletons
**Given** la app se acaba de montar
**When** fetchBooks está en progreso (loading=true)
**Then** BookList muestra 3 skeleton cards animadas

### S2: Libros cargados correctamente
**Given** fetchBooks completó exitosamente con libros
**When** loading=false y books.length > 0
**Then** BookList muestra los libros normalmente

### S3: Biblioteca vacía real
**Given** fetchBooks retornó una lista vacía
**When** loading=false y books.length === 0
**Then** BookList muestra "Tu biblioteca está vacía" con instrucción

### S4: Error de conexión
**Given** fetchBooks falló
**When** loading=false y hay un error
**Then** BookList muestra "Error al cargar" con botón Reintentar

### S5: Tests existentes pasan
**Given** los cambios en BookContext y BookList
**When** se ejecutan los tests existentes
**Then** todos pasan (ajustando setup si es necesario)
