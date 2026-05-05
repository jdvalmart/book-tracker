# Spec: UI Polish

**Capability**: ui-polish

---

## Requirements

### R1: Empty state con personalidad
El estado vacío muestra un emoji grande, mensaje cálido y CTA claro.

### R2: Error state con distinción visual
El estado de error muestra emoji, fondo suave y borde para distinguirse.

### R3: Botón submit deshabilitado durante envío
El botón "Agregar Libro" se deshabilita mientras la petición está en progreso para prevenir envíos duplicados.

### R4: Toasts con emoji
Los mensajes toast incluyen emoji contextual: 📚 para agregar, 🗑️ para eliminar, ✅ para actualizar.

### R5: Contador de libros
El header muestra la cantidad de libros: "3 libros en tu biblioteca".

---

## Scenarios

### S1: Biblioteca vacía muestra emoji y CTA
**Given** no hay libros cargados
**When** el usuario ve la página
**Then** ve un emoji 📖, "Tu biblioteca está vacía" y texto de instrucción

### S2: Error de conexión muestra emoji y caja visual
**Given** la API no responde
**When** fetchBooks falla
**Then** ve ⚠️ en una caja con borde rojo y botón Reintentar

### S3: Doble clic no crea duplicados
**Given** el usuario hace clic rápido en "Agregar Libro"
**When** la petición está en progreso
**Then** el botón está deshabilitado y no se envía una segunda petición

### S4: Toast de agregar muestra emoji
**Given** se agrega un libro exitosamente
**When** aparece el toast
**Then** muestra "📚 Libro agregado"

### S5: Header muestra contador
**Given** hay 3 libros cargados
**When** se renderiza la app
**Then** el header muestra "3 libros"
