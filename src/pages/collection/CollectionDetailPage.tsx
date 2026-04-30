import { useCollectionStore } from '@/store/useCollectionStore';
import { ANIMAL_LABELS, ANIMAL_EMOJI, ANIMAL_CELEBRITIES } from '@/types/collection';
import type { PokedexEntry, AnimalType } from '@/types/collection';

interface CollectionDetailProps {
  entry?: PokedexEntry;
}

const BAR_COLORS: Record<AnimalType, string> = {
  FOX:  'bg-orange-400',
  CAT:  'bg-pink-400',
  DOG:  'bg-yellow-400',
  BEAR: 'bg-amber-600',
};

const ANIMAL_ORDER: AnimalType[] = ['FOX', 'CAT', 'DOG', 'BEAR'];

function formatDate(iso: string | null): string {
  if (!iso) return '-';
  return new Date(iso).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function CollectionDetail({ entry }: CollectionDetailProps) {
  if (!entry) return null;
  const { animalType, bestSimilarity, firstDiscoveredAt, imageUrl } = entry;
  const selectedAnalysis = useCollectionStore((s) => s.selectedAnalysis);

  const label = ANIMAL_LABELS[animalType];
  const emoji = ANIMAL_EMOJI[animalType];
  const celebrities = ANIMAL_CELEBRITIES[animalType];

  const similarities: Record<AnimalType, number> =
    selectedAnalysis?.allSimilarities ?? {
      FOX:  animalType === 'FOX'  ? (bestSimilarity ?? 0) : 0,
      CAT:  animalType === 'CAT'  ? (bestSimilarity ?? 0) : 0,
      DOG:  animalType === 'DOG'  ? (bestSimilarity ?? 0) : 0,
      BEAR: animalType === 'BEAR' ? (bestSimilarity ?? 0) : 0,
    };

  const photo = selectedAnalysis?.imageUrl ?? imageUrl;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-start">
        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center border border-gray-200">
          {photo ? (
            <img src={photo} alt={label} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl">{emoji}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-4xl font-black text-gray-900 leading-none mb-1">
            {bestSimilarity !== null ? `${bestSimilarity.toFixed(0)}%` : '-'}
          </p>
          <p className="text-xs text-gray-400 mb-3">역대 최고 유사도</p>

          <div className="flex flex-col gap-1.5">
            {ANIMAL_ORDER.map((type) => (
              <div key={type} className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 w-14 flex-shrink-0 text-right">
                  {ANIMAL_LABELS[type]}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${BAR_COLORS[type]} transition-all duration-700`}
                    style={{ width: `${Math.min(similarities[type] ?? 0, 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 w-8 text-right">
                  {(similarities[type] ?? 0).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>

          {!selectedAnalysis && (
            <p className="text-[10px] text-gray-300 mt-2">상세 유사도 불러오는 중...</p>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          나의 동물상은{' '}
          <span className="text-orange-500 font-bold text-base">{label}</span>
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          최초 발견일: {formatDate(firstDiscoveredAt)}
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-700 mb-1.5">대표 연예인</p>
        <div className="flex flex-wrap gap-1.5">
          {celebrities.map((name) => (
            <span
              key={name}
              className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}