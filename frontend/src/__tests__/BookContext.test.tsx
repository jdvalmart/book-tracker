/**
 * Tests del hook useBooks y BookContext.
 *
 * Verifica que el hook lanza error cuando se usa
 * fuera de BookProvider (protección contra mal uso).
 */
import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { useBooks } from "../context/BookContext";

describe("useBooks", () => {
  test("lanza error si se usa fuera de BookProvider", () => {
    // Componente que usa el hook sin Provider ancestro
    const BadComponent = () => {
      useBooks();
      return null;
    };

    // Suprimir console.error del error esperado para no ensuciar la salida
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<BadComponent />)).toThrow(
      "useBooks must be used within BookProvider"
    );

    spy.mockRestore();
  });
});
