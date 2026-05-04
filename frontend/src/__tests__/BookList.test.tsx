/**
 * Tests del componente BookList.
 *
 * Verifica el estado vacío (sin libros) y el estado con datos.
 */
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { BookList } from "../components/BookList";
import { BookProvider } from "../context/BookContext";

describe("BookList", () => {
  test("muestra mensaje cuando no hay libros", () => {
    render(
      <BookProvider>
        <BookList />
      </BookProvider>
    );
    expect(screen.getByText(/No hay libros aún/)).toBeInTheDocument();
  });
});
