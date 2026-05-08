import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { ReadingStats } from "../components/ReadingStats";
import { BookProvider } from "../context/BookContext";
import { ToastProvider } from "../context/ToastContext";

describe("ReadingStats", () => {
  test("no renderiza cuando no hay libros", () => {
    const { container } = render(
      <ToastProvider>
        <BookProvider>
          <ReadingStats />
        </BookProvider>
      </ToastProvider>
    );
    // Sin API mockeada, books = [] → el componente retorna null
    expect(container.innerHTML).toBe("");
  });
});
