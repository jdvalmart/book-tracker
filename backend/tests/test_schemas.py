"""
Tests de validación Pydantic para BookCreate.

Estos tests validan que las reglas de negocio definidas en schemas.py
funcionan correctamente. Son tests UNITARIOS — no requieren base de datos,
servidor HTTP ni ninguna dependencia externa.

Cubren los escenarios S2-S4 de la spec:
- S2: título vacío → rechazado
- S3: título solo espacios → rechazado  
- S4: título faltante → rechazado
- Y adicionales: autor vacío, autor solo espacios
"""

import pytest
from pydantic import ValidationError

from schemas import BookCreate


class TestBookCreateValid:
    """Casos donde la validación DEBE aceptar los datos."""

    def test_crear_libro_valido(self):
        """
        S3 (spec original): Datos completos y válidos deben crear el objeto.
        
        Este es el "happy path" — el caso más común.
        """
        book = BookCreate(title="Clean Code", autor="Robert Martin", read=False)
        assert book.title == "Clean Code"
        assert book.autor == "Robert Martin"
        assert book.read is False

    def test_crear_libro_con_read_true(self):
        """El campo read es opcional y debe aceptar True."""
        book = BookCreate(title="1984", autor="George Orwell", read=True)
        assert book.read is True

    def test_crear_libro_sin_read_default_false(self):
        """Si no se envía read, debe ser False por defecto."""
        book = BookCreate(title="Dune", autor="Frank Herbert")
        assert book.read is False


class TestBookCreateTitleInvalid:
    """Casos donde el título DEBE ser rechazado."""

    def test_titulo_vacio_rechazado(self):
        """S2: Título vacío debe lanzar ValidationError."""
        with pytest.raises(ValidationError):
            BookCreate(title="", autor="Robert Martin", read=False)

    def test_titulo_solo_espacios_rechazado(self):
        """
        S3 original: Título con solo espacios debe lanzar ValidationError.
        
        Esto funciona gracias a model_config = {"str_strip_whitespace": True}
        en BookBase. Pydantic primero quita los espacios y luego verifica
        min_length=1, encontrando un string vacío.
        """
        with pytest.raises(ValidationError):
            BookCreate(title="   ", autor="Robert Martin", read=False)

    def test_titulo_faltante_rechazado(self):
        """S4: Si no se envía title, debe lanzar ValidationError."""
        with pytest.raises(ValidationError):
            BookCreate(autor="Robert Martin", read=False)


class TestBookCreateAuthorInvalid:
    """Casos donde el autor DEBE ser rechazado."""

    def test_autor_vacio_rechazado(self):
        """S6 (spec original): Autor vacío debe lanzar ValidationError."""
        with pytest.raises(ValidationError):
            BookCreate(title="Clean Code", autor="", read=False)

    def test_autor_solo_espacios_rechazado(self):
        """S7: Autor con solo espacios debe lanzar ValidationError."""
        with pytest.raises(ValidationError):
            BookCreate(title="Clean Code", autor="   ", read=False)


class TestBookCreateEdgeCases:
    """Casos borde — situaciones menos comunes pero importantes."""

    def test_titulo_con_espacios_alfinal_limpia_y_valida(self):
        """
        Espacios al inicio/final deben ser removidos por strip_whitespace.
        "  Clean Code  " → "Clean Code" → válido (tiene contenido).
        """
        book = BookCreate(title="  Clean Code  ", autor="Me", read=False)
        assert book.title == "Clean Code"  # Pydantic limpia los espacios

    def test_autor_con_unicode_valido(self):
        """Nombres con caracteres especiales (tildes, ñ) deben ser válidos."""
        book = BookCreate(
            title="Cien Años de Soledad",
            autor="Gabriel García Márquez",
            read=False,
        )
        assert book.autor == "Gabriel García Márquez"
