import { ANIMAL_LABELS, ANIMAL_EMOJI } from '@/types/collection';
import type { PokedexEntry } from '@/types/collection';
import { cn } from '@/lib/utils';

interface AnimalCardProps {
  entry: PokedexEntry;
  onClick: (entry: PokedexEntry) => void;
}

export default function AnimalCard({ entry, onClick }: AnimalCardProps) {
  const { animalType, discovered, bestSimilarity, imageUrl } = entry;
  const label = ANIMAL_LABELS[animalType];
  const emoji = ANIMAL_EMOJI[animalType];

  return (
    <div
      onClick={() => discovered && onClick(entry)}
      className={cn(
        'flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200',
        discovered
          ? 'cursor-pointer hover:bg-orange-50 hover:scale-105'
          : 'cursor-default opacity-40',
      )}
    >
      <div
        className={cn(
          'w-20 h-20 rounded-full overflow-hidden border-2 flex items-center justify-center',
          discovered
            ? 'border-orange-300 shadow-md shadow-orange-100'
            : 'border-gray-200 bg-gray-100',
        )}
      >
        {discovered && imageUrl ? (
          <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl grayscale">{emoji}</span>
        )}
      </div>
      <div className="text-center">
        <p className={cn(
          'text-xs font-semibold',
          discovered ? 'text-gray-800' : 'text-gray-400',
        )}>
          {discovered ? label : '???'}
        </p>
        {discovered && bestSimilarity !== null && (
          <p className="text-orange-500 text-xs font-bold mt-0.5">
            {bestSimilarity.toFixed(1)}%
          </p>
        )}
      </div>
    </div>
  );
}