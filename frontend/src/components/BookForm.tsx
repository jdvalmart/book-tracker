import { useState } from "react";
import { useBooks } from "../context/BookContext";

export const BookForm = () => {
  const { addBook } = useBooks();
  const [title, setTitle] = useState("");
  const [autor, setAutor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !autor.trim()) return;

    addBook({ title, autor, read: false });
    setTitle("");
    setAutor("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mb-6 border-none rounded-lg bg-gray-50,"
    >
      <input
        type="text"
        placeholder="Título del libro"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Agregar Libro
      </button>
    </form>
  );
};
