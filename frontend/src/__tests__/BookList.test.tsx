import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { BookList } from "../components/BookList";
import { render } from "./setup";

describe("BookList", () => {
  test("muestra mensaje cuando no hay libros", () => {
    render(<BookList />);
    expect(screen.getByText(/No hay libros aún/)).toBeInTheDocument();
  });
});
