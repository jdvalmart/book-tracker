import { useBooks } from "../context/BookContext";

const StatCard = ({
  label,
  value,
  emoji,
}: {
  label: string;
  value: number;
  emoji: string;
}) => (
  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
    <span className="text-xl">{emoji}</span>
    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</div>
    <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
  </div>
);

export const ReadingStats = () => {
  const { books } = useBooks();

  if (books.length === 0) return null;

  const total = books.length;
  const read = books.filter((b) => b.read).length;
  const unread = total - read;
  const percent = Math.round((read / total) * 100);

  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      <StatCard label="Total" value={total} emoji="📚" />
      <StatCard label="Leídos" value={read} emoji="✅" />
      <StatCard label="Pendientes" value={unread} emoji="📖" />

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
        <span className="text-xl">📊</span>
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{percent}%</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">completado</div>
        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percent === 100 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
