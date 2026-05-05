import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Book } from "../types/Book";
import type { ReactNode } from "react";
import api from "../api/axios";
import { useToast } from "./ToastContext";

interface BookContextType {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => void;
  retry: () => void;
  addBook: (book: Omit<Book, "id">) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Book[]>("/books");
      setBooks(res.data);
    } catch {
      setError("No se pudo conectar con el servidor");
      toast.error("Error al cargar los libros");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const retry = useCallback(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = async (book: Omit<Book, "id">) => {
    try {
      const res = await api.post<Book>("/books", book);
      setBooks((prev) => [...prev, res.data]);
      toast.success("Libro agregado");
    } catch {
      toast.error("Error al agregar el libro");
    }
  };

  const updateBook = async (book: Book) => {
    try {
      const { id, title, autor, read } = book;
      const res = await api.put<Book>(`/books/${id}`, { title, autor, read });
      setBooks((prev) => prev.map((b) => (b.id === id ? res.data : b)));
      toast.success("Libro actualizado");
    } catch {
      toast.error("Error al actualizar el libro");
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      toast.success("Libro eliminado");
    } catch {
      toast.error("Error al eliminar el libro");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <BookContext.Provider
      value={{ books, loading, error, fetchBooks, retry, addBook, updateBook, deleteBook }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBooks must be used within BookProvider");
  return context;
};
