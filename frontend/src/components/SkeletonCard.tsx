/**
 * SkeletonCard — placeholder animado que simula la estructura
 * de un BookItem mientras los datos están cargando.
 *
 * Usa animate-pulse de Tailwind para la animación.
 */
export const SkeletonCard = () => (
  <div className="animate-pulse flex justify-between items-center p-3 border rounded-lg">
    <div className="space-y-2 flex-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
    <div className="flex gap-2">
      <div className="h-8 w-16 bg-gray-200 rounded" />
      <div className="h-8 w-16 bg-gray-200 rounded" />
    </div>
  </div>
);
