import api from './axios';
import type {
  PresignedUrlRequest,
  PresignedUrlResponse,
  AnalysisRequest,
  AnalysisResponse,
} from '../types/result';

// 1단계: S3 presigned URL 발급
export const getPresignedUrl = async (
  req: PresignedUrlRequest
): Promise<PresignedUrlResponse> => {
  const { data } = await api.post<PresignedUrlResponse>(
    '/api/v1/storage/presigned-url',
    req
  );
  return data;
};

// 2단계: S3에 직접 이미지 업로드
export const uploadToS3 = async (
  presignedUrl: string,
  file: File
): Promise<void> => {
  await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
};

// 3단계: 동물상 분석 요청
export const requestAnalysis = async (
  req: AnalysisRequest
): Promise<AnalysisResponse> => {
  const { data } = await api.post<AnalysisResponse>('/api/v1/analysis', req);
  return data;
};

// 분석 결과 조회
export const getAnalysisResult = async (
  analysisId: string
): Promise<AnalysisResponse> => {
  const { data } = await api.get<AnalysisResponse>(
    `/api/v1/analysis/${analysisId}`
  );
  return data;
};

// 전체 업로드 + 분석 흐름
export const uploadAndAnalyze = async (file: File): Promise<AnalysisResponse> => {
  const { presignedUrl, imageUrl } = await getPresignedUrl({
    fileName: file.name,
    contentType: file.type,
  });
  await uploadToS3(presignedUrl, file);
  return await requestAnalysis({ imageUrl });
};
