import { createContext, useContext, useState, useEffect } from "react";
import type { Book } from "../types/Book";
import axios from "axios";
import type { ReactNode } from "react";

interface BookContextType {
  books: Book[];
  fetchBooks: () => void;
  addBook: (book: Omit<Book, "id">) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL;

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get<Book[]>(`${API_URL}/books`);
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addBook = async (book: Omit<Book, "id">) => {
    try {
      const res = await axios.post<Book>(`${API_URL}/books`, book);
      setBooks((prev) => [...prev, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateBook = async (book: Book) => {
    try {
      const { id, title, autor, read } = book;
      const res = await axios.put<Book>(`${API_URL}/books/${id}`, {
        title,
        autor,
        read,
      });
      setBooks((prev) => prev.map((b) => (b.id === book.id ? res.data : b)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
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
