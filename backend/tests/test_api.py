"""
Tests de integración para los endpoints de la API.

Usan el cliente HTTP asíncrono (ASGITransport) y una base de datos
PostgreSQL de prueba que se crea/destruye por cada test.

Cubren los escenarios S4-S6 de la spec:
- S4: GET /books retorna 200
- S5: POST /books crea un libro
- S6: DELETE /books/{id} retorna 204
"""

import pytest

# setup_db asegura que cada test empieza con tablas limpias
pytestmark = pytest.mark.usefixtures("setup_db")


class TestGetBooks:
    """Tests para GET /books — listar libros."""

    async def test_lista_vacia_retorna_200_y_array(self, client):
        """
        S4: Con la base de datos recién creada, GET /books debe
        retornar 200 y una lista vacía.
        """
        response = await client.get("/books")
        assert response.status_code == 200
        assert response.json() == []

    async def test_lista_con_libros(self, client):
        """
        Después de crear un libro, GET /books debe incluir ese libro.
        """
        # Crear un libro primero
        await client.post("/books", json={
            "title": "Clean Code",
            "autor": "Robert Martin",
            "read": False,
        })

        # Obtener la lista
        response = await client.get("/books")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 1
        assert data[0]["title"] == "Clean Code"


class TestCreateBook:
    """Tests para POST /books — crear libros."""

    async def test_crear_libro_valido_retorna_datos(self, client):
        """
        S5: Un POST con datos válidos debe retornar el libro creado
        con un id generado automáticamente.
        """
        response = await client.post("/books", json={
            "title": "1984",
            "autor": "George Orwell",
            "read": False,
        })
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "1984"
        assert data["autor"] == "George Orwell"
        assert data["read"] is False
        assert "id" in data
        assert len(data["id"]) > 0  # UUID generado

    async def test_crear_libro_invalido_retorna_422(self, client):
        """
        Un POST con título vacío debe retornar 422 (validación Pydantic).
        FastAPI maneja esto automáticamente gracias a los constraints
        definidos en BookBase.
        """
        response = await client.post("/books", json={
            "title": "",
            "autor": "Someone",
            "read": False,
        })
        assert response.status_code == 422


class TestDeleteBook:
    """Tests para DELETE /books/{id} — eliminar libros."""

    async def test_eliminar_libro_existente_retorna_204(self, client):
        """
        S6: Eliminar un libro existente debe retornar 204.
        Un GET posterior NO debe encontrar el libro.
        """
        # Crear un libro
        create_resp = await client.post("/books", json={
            "title": "To Delete",
            "autor": "Me",
            "read": False,
        })
        book_id = create_resp.json()["id"]

        # Eliminarlo
        delete_resp = await client.delete(f"/books/{book_id}")
        assert delete_resp.status_code == 204

        # Verificar que ya no existe
        get_resp = await client.get("/books")
        assert len(get_resp.json()) == 0

    async def test_eliminar_libro_inexistente_retorna_404(self, client):
        """
        Eliminar un ID que no existe debe retornar 404.
        """
        response = await client.delete("/books/fake-id-123")
        assert response.status_code == 404


class TestUpdateBook:
    """Tests para PUT /books/{id} — actualizar libros."""

    async def test_actualizar_libro_existente(self, client):
        """
        Actualizar un libro existente debe modificar sus campos.
        """
        # Crear
        create_resp = await client.post("/books", json={
            "title": "Old Title",
            "autor": "Old Author",
            "read": False,
        })
        book_id = create_resp.json()["id"]

        # Actualizar
        update_resp = await client.put(f"/books/{book_id}", json={
            "title": "New Title",
            "autor": "New Author",
            "read": True,
        })
        assert update_resp.status_code == 200
        data = update_resp.json()
        assert data["title"] == "New Title"
        assert data["autor"] == "New Author"
        assert data["read"] is True

    async def test_actualizar_libro_invalido_retorna_422(self, client):
        """
        Un PUT con datos inválidos debe retornar 422.
        """
        # Crear un libro primero para tener un ID válido
        create_resp = await client.post("/books", json={
            "title": "Valid",
            "autor": "Author",
            "read": False,
        })
        book_id = create_resp.json()["id"]

        # Intentar actualizar con título vacío
        response = await client.put(f"/books/{book_id}", json={
            "title": "",
            "autor": "New Author",
            "read": True,
        })
        assert response.status_code == 422

    async def test_actualizar_libro_inexistente_retorna_404(self, client):
        """
        Bug fix: PUT a un ID que no existe debe retornar 404.
        Antes devolvía 200 silenciosamente (falsa confirmación).
        """
        response = await client.put("/books/fake-id-999", json={
            "title": "Ghost",
            "autor": "Nobody",
            "read": False,
        })
        assert response.status_code == 404
