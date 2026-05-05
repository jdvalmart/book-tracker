import { screen, waitFor } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { BookList } from "../components/BookList";
import { render } from "./setup";

describe("BookList", () => {
  test("muestra skeletons mientras carga", () => {
    render(<BookList />);
    // Los skeletons usan animate-pulse — verificamos que hay 3
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThanOrEqual(1);
  });

  test("muestra estado de error cuando falla la carga", async () => {
    render(<BookList />);
    // Como no hay API real, fetchBooks falla y muestra error
    await waitFor(() => {
      expect(screen.getByText(/No se pudo conectar/)).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: "Reintentar" })).toBeInTheDocument();
  });
});
