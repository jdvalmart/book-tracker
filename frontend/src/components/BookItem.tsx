import type { Book } from "../types/Book";
import { useBooks } from "../context/BookContext";

interface Props {
  book: Book;
}

export const BookItem = ({ book }: Props) => {
  const { updateBook, deleteBook } = useBooks();

  const toggleRead = () => {
    updateBook({ ...book, read: !book.read });
  };

  return (
    <li className="flex justify-between items-center p-3 border dark:border-gray-600 rounded-lg">
      <div>
        <h3
          className={`font-semibold dark:text-gray-100 ${
            book.read ? "line-through text-gray-400 dark:text-gray-500" : ""
          }`}
        >
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{book.autor}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={toggleRead}
          className={`px-3 py-1 rounded text-sm ${
            book.read
              ? "bg-yellow-500 dark:bg-yellow-600 text-black"
              : "bg-green-600 dark:bg-green-500 text-white"
          }`}
        >
          {book.read ? "No leído" : "Leído"}
        </button>
        <button
          onClick={() => deleteBook(book.id!)}
          className="bg-red-600 dark:bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};
