import { BookProvider } from "./context/BookContext";
import { ToastProvider } from "./context/ToastContext";
import { BookForm } from "./components/BookForm";
import { BookList } from "./components/BookList";
import { ToastContainer } from "./components/Toast";

function App() {
  return (
    <ToastProvider>
      <BookProvider>
        <div className="min-h-screen bg-gray-100 flex justify-center p-6">
          <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">
              📚 Book Tracker
            </h1>
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
