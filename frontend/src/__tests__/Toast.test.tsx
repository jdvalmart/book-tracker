import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { ToastProvider, useToast } from "../context/ToastContext";
import { ToastContainer } from "../components/Toast";
import { useEffect } from "react";

describe("Toast", () => {
  test("muestra mensaje de éxito", () => {
    const Trigger = () => {
      const { success } = useToast();
      useEffect(() => { success("Operación completada"); }, []);
      return null;
    };

    render(
      <ToastProvider>
        <Trigger />
        <ToastContainer />
      </ToastProvider>
    );

    expect(screen.getByText("Operación completada")).toBeInTheDocument();
  });

  test("muestra mensaje de error", () => {
    const Trigger = () => {
      const { error } = useToast();
      useEffect(() => { error("Algo salió mal"); }, []);
      return null;
    };

    render(
      <ToastProvider>
        <Trigger />
        <ToastContainer />
      </ToastProvider>
    );

    expect(screen.getByText("Algo salió mal")).toBeInTheDocument();
  });
});
