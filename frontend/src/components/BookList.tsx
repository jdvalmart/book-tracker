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

  // ❌ Error — caja visual con emoji
  if (error) {
    return (
      <div className="text-center py-6 px-4 border border-red-200 bg-red-50 rounded-lg">
        <span className="text-3xl">⚠️</span>
        <p className="text-red-700 mt-2">{error}</p>
        <button
          onClick={retry}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // 📭 Vacío real — emoji grande + tono cálido
  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <span className="text-5xl">📖</span>
        <p className="text-gray-600 text-lg mt-3">
          Tu biblioteca está vacía
        </p>
        <p className="text-gray-400 text-sm mt-1">
          ¡Agrega tu primer libro usando el formulario!
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
