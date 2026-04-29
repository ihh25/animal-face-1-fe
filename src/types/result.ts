export interface AnimalPrediction {
  label: string;
  probability: number; // 0 ~ 1
}

export interface AnalysisResult {
  analysisId: string;
  imageUrl: string;
  topAnimal: string;
  animals: AnimalPrediction[];
  createdAt: string;
}

export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
}

export interface PresignedUrlResponse {
  presignedUrl: string;
  imageUrl: string;
}

export interface AnalysisRequest {
  imageUrl: string;
}

export interface AnalysisResponse {
  analysisId: string;
  imageUrl: string;
  topAnimal: string;
  animals: AnimalPrediction[];
  createdAt: string;
}
