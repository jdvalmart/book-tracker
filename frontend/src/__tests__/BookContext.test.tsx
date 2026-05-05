import { render as rawRender } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { useBooks } from "../context/BookContext";

describe("useBooks", () => {
  test("lanza error si se usa fuera de BookProvider", () => {
    const BadComponent = () => {
      useBooks();
      return null;
    };

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => rawRender(<BadComponent />)).toThrow(
      "useBooks must be used within BookProvider"
    );

    spy.mockRestore();
  });
});
