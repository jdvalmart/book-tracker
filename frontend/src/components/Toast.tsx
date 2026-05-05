import { useToast } from "../context/ToastContext";

export const ToastContainer = () => {
  const { toasts, remove } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm min-w-[280px] animate-slide-in ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => remove(toast.id)}
            className="text-white/80 hover:text-white font-bold text-lg leading-none"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
