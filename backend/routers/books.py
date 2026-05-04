"""
Router de libros — endpoints HTTP para el recurso /books.

Responsabilidades de esta capa:
- Recibir requests HTTP
- Validar schemas Pydantic
- Llamar al service
- Devolver responses HTTP

NO contiene lógica de negocio ni SQL.
"""

from fastapi import APIRouter, HTTPException

from schemas import Book, BookCreate
from services import book_service

router = APIRouter(prefix="/books", tags=["books"])


@router.get("", response_model=list[Book])
async def get_books():
    """Lista todos los libros."""
    return await book_service.get_all()


@router.post("", response_model=Book)
async def create_book(book: BookCreate):
    """Crea un libro nuevo."""
    data = book.model_dump()
    return await book_service.create(data)


@router.put("/{book_id}", response_model=Book)
async def update_book(book_id: str, book: BookCreate):
    """Actualiza un libro existente."""
    data = book.model_dump()
    return await book_service.update(book_id, data)


@router.delete("/{book_id}", status_code=204)
async def delete_book(book_id: str):
    """Elimina un libro. Retorna 404 si no existe."""
    deleted = await book_service.delete(book_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Book not found")
