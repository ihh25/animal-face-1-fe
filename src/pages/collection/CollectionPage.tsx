import { useEffect } from 'react';
import { useCollectionStore } from '@/store/useCollectionStore';
import AnimalCard from '@/components/AnimalCard';
import Modal from '@/components/Modal';
import CollectionDetail from '@/pages/collection/CollectionDetailPage';
import { ANIMAL_LABELS } from '@/types/collection';
import type { PokedexEntry } from '@/types/collection';

export default function CollectionList() {
  const {
    pokedex,
    isPokedexLoading,
    pokedexError,
    isModalOpen,
    selectedEntry,
    fetchPokedex,
    openModal,
    closeModal,
  } = useCollectionStore();

  useEffect(() => {
    fetchPokedex();
  }, [fetchPokedex]);

  if (isPokedexLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
          <p className="text-gray-400 text-sm">도감 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (pokedexError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-3 text-sm">{pokedexError}</p>
          <button
            onClick={fetchPokedex}
            className="text-orange-500 underline text-sm hover:text-orange-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const entries = pokedex?.entries ?? [];

  return (
    <main className="min-h-screen bg-white pt-16">
      <div className="max-w-xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">내 도감</h1>
          {pokedex && (
            <p className="text-sm text-gray-400 mt-1">
              <span className="text-orange-500 font-bold">{pokedex.totalDiscovered}</span>
              {' / '}
              {pokedex.totalTypes}종 발견
            </p>
          )}
          {pokedex && (
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden w-40">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-700"
                style={{
                  width: `${(pokedex.totalDiscovered / pokedex.totalTypes) * 100}%`,
                }}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {entries.map((entry) => (
            <AnimalCard
              key={entry.animalType}
              entry={entry}
              onClick={(e: PokedexEntry) => openModal(e)}
            />
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🐾</p>
            <p className="text-sm">아직 발견한 동물상이 없어요</p>
            <p className="text-xs mt-1">분석을 시작해보세요!</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedEntry ? `${ANIMAL_LABELS[selectedEntry.animalType]} 정보` : undefined}
      >
        {selectedEntry && <CollectionDetail entry={selectedEntry} />}
      </Modal>
    </main>
  );
}