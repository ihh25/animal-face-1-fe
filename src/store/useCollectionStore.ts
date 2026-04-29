import { create } from 'zustand';
import { getMyPokedex, getMyAnalysisList } from '@/api/collection';
import type { PokedexRes, PokedexEntry, AnalysisRes } from '@/types/collection';

interface CollectionState {
  pokedex: PokedexRes | null;
  isPokedexLoading: boolean;
  pokedexError: string | null;

  allAnalyses: AnalysisRes[];
  isAnalysesLoaded: boolean;

  selectedEntry: PokedexEntry | null;
  isModalOpen: boolean;
  selectedAnalysis: AnalysisRes | null;

  fetchPokedex: () => Promise<void>;
  openModal: (entry: PokedexEntry) => Promise<void>;
  closeModal: () => void;
  reset: () => void;
}

const initialState = {
  pokedex: null,
  isPokedexLoading: false,
  pokedexError: null,
  allAnalyses: [],
  isAnalysesLoaded: false,
  selectedEntry: null,
  isModalOpen: false,
  selectedAnalysis: null,
};

export const useCollectionStore = create<CollectionState>((set, get) => ({
  ...initialState,

  fetchPokedex: async () => {
    set({ isPokedexLoading: true, pokedexError: null });
    try {
      const data = await getMyPokedex();
      set({ pokedex: data, isPokedexLoading: false });
    } catch (err) {
      set({
        pokedexError: err instanceof Error ? err.message : '도감을 불러오지 못했어요.',
        isPokedexLoading: false,
      });
    }
  },

  openModal: async (entry) => {
    set({ selectedEntry: entry, isModalOpen: true, selectedAnalysis: null });

    let analyses = get().allAnalyses;
    if (!get().isAnalysesLoaded) {
      try {
        const page = await getMyAnalysisList(0, 100);
        analyses = page.content;
        set({ allAnalyses: analyses, isAnalysesLoaded: true });
      } catch {
        return;
      }
    }

    const matched = analyses
      .filter((a) => a.animalType === entry.animalType)
      .sort((a, b) => b.similarity - a.similarity)[0] ?? null;

    set({ selectedAnalysis: matched });
  },

  closeModal: () =>
    set({ isModalOpen: false, selectedEntry: null, selectedAnalysis: null }),

  reset: () => set(initialState),
}));