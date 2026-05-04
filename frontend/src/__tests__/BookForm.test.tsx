/**
 * Tests del componente BookForm.
 *
 * Verifica que renderiza los campos de entrada correctamente
 * y que el botón de submit está presente.
 */
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { BookForm } from "../components/BookForm";
import { BookProvider } from "../context/BookContext";

describe("BookForm", () => {
  test("renderiza input de título", () => {
    render(
      <BookProvider>
        <BookForm />
      </BookProvider>
    );
    expect(
      screen.getByPlaceholderText("Título del libro")
    ).toBeInTheDocument();
  });

  test("renderiza input de autor", () => {
    render(
      <BookProvider>
        <BookForm />
      </BookProvider>
    );
    expect(screen.getByPlaceholderText("Autor")).toBeInTheDocument();
  });

  test("renderiza botón de agregar", () => {
    render(
      <BookProvider>
        <BookForm />
      </BookProvider>
    );
    expect(
      screen.getByRole("button", { name: "Agregar Libro" })
    ).toBeInTheDocument();
  });
});
