import { useBooks } from "../context/BookContext";
import { BookItem } from "./BookItem";
import { SkeletonCard } from "./SkeletonCard";

export const BookList = () => {
  const { books, loading, error, retry } = useBooks();

  // 🔄 Cargando — skeletons animados
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  // ❌ Error — mensaje + reintentar
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-3">{error}</p>
        <button
          onClick={retry}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // 📭 Vacío real — CTA
  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg mb-2">Tu biblioteca está vacía</p>
        <p className="text-gray-400 text-sm">
          ¡Agrega tu primer libro usando el formulario de arriba!
        </p>
      </div>
    );
  }

  // ✅ Libros cargados
  return (
    <ul className="flex flex-col gap-3">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  );
};
