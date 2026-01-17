import { BookProvider } from "./context/BookContext";
import { BookForm } from "./components/BookForm";
import { BookList } from "./components/BookList";

function App() {
  return (
    <BookProvider>
      <div className="min-h-screen bg-gray-100 flex justify-center p-6">
        <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-4 text-center">
            📚 Book Tarcker New
          </h1>
          <BookForm />
          <BookList />
        </div>
      </div>
    </BookProvider>
  );
}

export default App;
