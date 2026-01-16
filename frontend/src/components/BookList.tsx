import { useBooks } from "../context/BookContext";
import { BookItem } from "./BookItem";

export const BookList = () => {
  const { books } = useBooks();

  if (books.length === 0) {
    return <p className="text-center text-gray-500">No hay libros aún 📚</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  );
};
