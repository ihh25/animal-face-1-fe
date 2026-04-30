// 공통 응답 형식
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// 동물상 타입
export type AnimalType = 'CAT' | 'DOG' | 'FOX' | 'BEAR';

// 동물 하나의 예측 결과
export interface AnimalPrediction {
  label: AnimalType;
  probability: number; // 0 ~ 1
}

// 분석 결과
export interface AnalysisResult {
  id: number;
  animalType: AnimalType;       // ← topAnimal → animalType
  similarity: number;           // ← 추가
  allSimilarities: {            // ← animals → allSimilarities
    CAT: number;
    DOG: number;
    FOX: number;
    BEAR: number;
  };
  imageUrl: string;
  createdAt: string;
}

// Presigned URL 요청
export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
}

// Presigned URL 응답
export interface PresignedUrlResponse {
  presignedUrl: string;
  imageUrl: string;
}

// 분석 요청
export interface AnalysisRequest {
  imageUrl: string;
}
