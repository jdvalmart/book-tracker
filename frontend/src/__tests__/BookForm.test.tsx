import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { BookForm } from "../components/BookForm";
import { render } from "./setup";

describe("BookForm", () => {
  test("renderiza input de título", () => {
    render(<BookForm />);
    expect(
      screen.getByPlaceholderText("Título del libro")
    ).toBeInTheDocument();
  });

  test("renderiza input de autor", () => {
    render(<BookForm />);
    expect(screen.getByPlaceholderText("Autor")).toBeInTheDocument();
  });

  test("renderiza botón de agregar", () => {
    render(<BookForm />);
    expect(
      screen.getByRole("button", { name: "Agregar Libro" })
    ).toBeInTheDocument();
  });
});
