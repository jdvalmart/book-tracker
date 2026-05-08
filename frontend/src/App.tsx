import { BookProvider, useBooks } from "./context/BookContext";
import { ToastProvider } from "./context/ToastContext";
import { BookForm } from "./components/BookForm";
import { BookList } from "./components/BookList";
import { ToastContainer } from "./components/Toast";
import { ReadingStats } from "./components/ReadingStats";

function BookCounter() {
  const { books, loading } = useBooks();
  if (loading || books.length === 0) return null;

  return (
    <p className="text-sm text-gray-500 text-center mt-1">
      {books.length} {books.length === 1 ? "libro" : "libros"} en tu biblioteca
    </p>
  );
}

function App() {
  return (
    <ToastProvider>
      <BookProvider>
        <div className="min-h-screen bg-gray-100 flex justify-center p-6">
          <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">
              📚 Book Tracker
            </h1>
            <BookCounter />
            <ReadingStats />
            <BookForm />
            <BookList />
          </div>
        </div>
        <ToastContainer />
      </BookProvider>
    </ToastProvider>
  );
}

export default App;
