export type AnimalType = 'CAT' | 'DOG' | 'FOX' | 'BEAR';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface PokedexEntry {
  animalType: AnimalType;
  discovered: boolean;
  bestSimilarity: number | null;
  firstDiscoveredAt: string | null;
  imageUrl: string | null;
}

export interface PokedexRes {
  totalDiscovered: number;
  totalTypes: number;
  entries: PokedexEntry[];
}

export interface AnalysisRes {
  id: number;
  animalType: AnimalType;
  similarity: number;
  allSimilarities: Record<AnimalType, number>;
  imageUrl: string;
  createdAt: string;
}

export interface PageAnalysisRes {
  content: AnalysisRes[];
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export const ANIMAL_LABELS: Record<AnimalType, string> = {
  CAT:  '고양이상',
  DOG:  '강아지상',
  FOX:  '여우상',
  BEAR: '곰상',
};

export const ANIMAL_EMOJI: Record<AnimalType, string> = {
  CAT:  '🐱',
  DOG:  '🐶',
  FOX:  '🦊',
  BEAR: '🐻',
};

export const ANIMAL_CELEBRITIES: Record<AnimalType, string[]> = {
  FOX:  ['아이유', '수지 (미스에이)', '차은우(아스트로)'],
  CAT:  ['장원영', '고윤정', '김태리'],
  DOG:  ['박보검', '송중기', '뷔(BTS)'],
  BEAR: ['이병헌', '마동석', '조인성'],
};