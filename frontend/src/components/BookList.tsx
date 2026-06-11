import { useBooks } from "../context/BookContext";
import { BookItem } from "./BookItem";
import { SkeletonCard } from "./SkeletonCard";

export const BookList = () => {
  const { books, loading, error, retry } = useBooks();

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 px-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 rounded-lg">
        <span className="text-3xl">⚠️</span>
        <p className="text-red-700 dark:text-red-300 mt-2">{error}</p>
        <button
          onClick={retry}
          className="mt-3 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 text-sm"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <span className="text-5xl">📖</span>
        <p className="text-gray-600 dark:text-gray-300 text-lg mt-3">
          Tu biblioteca está vacía
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
          ¡Agrega tu primer libro usando el formulario!
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  );
};
