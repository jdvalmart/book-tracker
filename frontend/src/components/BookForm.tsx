import { useState } from "react";
import { useBooks } from "../context/BookContext";

export const BookForm = () => {
  const { addBook } = useBooks();
  const [title, setTitle] = useState("");
  const [autor, setAutor] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !autor.trim()) return;

    setSubmitting(true);
    await addBook({ title, autor, read: false });
    setTitle("");
    setAutor("");
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mb-6"
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
        disabled={submitting}
        className={`py-2 rounded text-white ${
          submitting
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {submitting ? "Agregando..." : "Agregar Libro"}
      </button>
    </form>
  );
};
