# Spec: Book Validation

**Capability**: book-validation  
**Status**: active (archived — implemented in 2026-05-02-book-validation)

---

## Requirements

### R1: Title must be non-empty

When creating or updating a book, the title field must contain at least one non-whitespace character.

- **Type**: validation
- **Priority**: high

---

## Scenarios

### S1: Create book with valid title

**Given** the client sends a POST request to `/books` with  
`{ "title": "Clean Code", "autor": "Robert Martin", "read": false }`

**When** the server processes the request

**Then** the response status is 200 and the book is created with the given title

---

### S2: Create book with empty title

**Given** the client sends a POST request to `/books` with  
`{ "title": "", "autor": "Robert Martin", "read": false }`

**When** the server processes the request

**Then** the response status is 422 (Unprocessable Entity) with a validation error for title

---

### S3: Create book with whitespace-only title

**Given** the client sends a POST request to `/books` with  
`{ "title": "   ", "autor": "Robert Martin", "read": false }`

**When** the server processes the request

**Then** the response status is 422 (Unprocessable Entity) with a validation error for title

---

### S4: Create book with missing title

**Given** the client sends a POST request to `/books` with  
`{ "autor": "Robert Martin", "read": false }`

**When** the server processes the request

**Then** the response status is 422 (Unprocessable Entity) with a validation error for title

---

### S5: Create book with valid author

**Given** the client sends a POST request to `/books` with  
`{ "title": "Clean Code", "autor": "Robert Martin", "read": false }`

**When** the server processes the request

**Then** the response status is 200 and the book is created with the given author

---

### S6: Create book with empty author

**Given** the client sends a POST request to `/books` with  
`{ "title": "Clean Code", "autor": "", "read": false }`

**When** the server processes the request

**Then** the response status is 422 (Unprocessable Entity) with a validation error for author

---

### S7: Create book with whitespace-only author

**Given** the client sends a POST request to `/books` with  
`{ "title": "Clean Code", "autor": "   ", "read": false }`

**When** the server processes the request

**Then** the response status is 422 (Unprocessable Entity) with a validation error for author

---

### S8: Update book with empty title

**Given** a book with id "abc-123" exists in the database  
**And** the client sends a PUT request to `/books/abc-123` with  
`{ "title": "", "autor": "New Author", "read": true }`

**When** the server processes the request

**Then** the response status is 422 (Unprocessable Entity) with a validation error for title

---

### S9: Update book with valid fields

**Given** a book with id "abc-123" exists in the database  
**And** the client sends a PUT request to `/books/abc-123` with  
`{ "title": "Updated Title", "autor": "New Author", "read": true }`

**When** the server processes the request

**Then** the response status is 200 and the book is updated with the new values

---

*Main spec for book-validation capability. Implemented in 2026-05-02-book-validation, archived 2026-05-04.*