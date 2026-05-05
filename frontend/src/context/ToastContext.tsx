import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

export interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

interface ToastContextType {
  toasts: Toast[];
  success: (message: string) => void;
  error: (message: string) => void;
  remove: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let nextId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback((message: string, type: "success" | "error") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    // Auto-remover después de 4 segundos
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const success = useCallback((message: string) => add(message, "success"), [add]);
  const error = useCallback((message: string) => add(message, "error"), [add]);
  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, success, error, remove }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
