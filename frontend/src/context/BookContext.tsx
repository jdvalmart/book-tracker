import { createContext, useContext, useState, useEffect } from "react";
import type { Book } from "../types/Book";
import type { ReactNode } from "react";
import api from "../api/axios";
import { useToast } from "./ToastContext";

interface BookContextType {
  books: Book[];
  fetchBooks: () => void;
  addBook: (book: Omit<Book, "id">) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const toast = useToast();

  const fetchBooks = async () => {
    try {
      const res = await api.get<Book[]>("/books");
      setBooks(res.data);
    } catch {
      toast.error("Error al cargar los libros");
    }
  };

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
  }, []);

  return (
    <BookContext.Provider
      value={{ books, fetchBooks, addBook, updateBook, deleteBook }}
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
