"""
Capa de servicios — lógica de negocio para libros.

Esta capa NO sabe de HTTP. Solo conoce:
- La base de datos (database, models)
- Las reglas de negocio

Si mañana agregas GraphQL o gRPC, reusas este mismo service.
"""

from uuid import uuid4

from database import database
from models import books


async def get_all() -> list[dict]:
    """Obtiene todos los libros de la base de datos."""
    query = books.select()
    return await database.fetch_all(query)


async def create(data: dict) -> dict:
    """
    Crea un libro nuevo.

    Args:
        data: Diccionario con title, autor, read

    Returns:
        Dict con id generado + los datos recibidos
    """
    book_id = str(uuid4())
    query = books.insert().values(id=book_id, **data)
    await database.execute(query)
    return {"id": book_id, **data}


async def update(book_id: str, data: dict) -> dict:
    """
    Actualiza un libro existente.

    Args:
        book_id: UUID del libro
        data: Diccionario con los campos a actualizar

    Returns:
        Dict con id + datos actualizados
    """
    query = (
        books.update()
        .where(books.c.id == book_id)
        .values(**data)
    )
    await database.execute(query)
    return {"id": book_id, **data}


async def delete(book_id: str) -> bool:
    """
    Elimina un libro por ID.

    Returns:
        True si se eliminó, False si no existía
    """
    query = books.delete().where(books.c.id == book_id)
    result = await database.execute(query)
    return result > 0
