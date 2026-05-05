import "@testing-library/jest-dom/vitest";
import { render, type RenderOptions } from "@testing-library/react";
import { type ReactElement } from "react";
import { ToastProvider } from "../context/ToastContext";
import { BookProvider } from "../context/BookContext";

/**
 * Wrapper que provee todos los contextos necesarios para tests.
 * Úsalo en vez de render() cuando el componente bajo prueba
 * necesite BookContext o ToastContext.
 */
const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <BookProvider>{children}</BookProvider>
  </ToastProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
