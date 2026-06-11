import { BookProvider, useBooks } from "./context/BookContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { BookForm } from "./components/BookForm";
import { BookList } from "./components/BookList";
import { ToastContainer } from "./components/Toast";
import { ReadingStats } from "./components/ReadingStats";

function BookCounter() {
  const { books, loading } = useBooks();
  if (loading || books.length === 0) return null;

  return (
    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
      {books.length} {books.length === 1 ? "libro" : "libros"} en tu biblioteca
    </p>
  );
}

function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="absolute top-4 right-4 text-xl hover:scale-110 transition-transform"
      aria-label={isDark ? "Modo claro" : "Modo oscuro"}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BookProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center p-6">
            <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow relative">
              <ThemeToggle />
              <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
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
    </ThemeProvider>
  );
}

export default App;
