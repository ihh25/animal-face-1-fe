import api from './axios';
import type {
  ApiResponse,
  PresignedUrlRequest,
  PresignedUrlResponse,
  AnalysisRequest,
  AnalysisResult,
} from '../types/result';

// 1단계: S3 presigned URL 발급
export const getPresignedUrl = async (
  req: PresignedUrlRequest
): Promise<PresignedUrlResponse> => {
  const { data } = await api.post<ApiResponse<PresignedUrlResponse>>(
    '/api/v1/storage/presigned-url',
    req
  );
  return data.data;
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
): Promise<AnalysisResult> => {
  const { data } = await api.post<ApiResponse<AnalysisResult>>(
    '/api/v1/analysis',
    req
  );
  return data.data;
};

// 분석 결과 단건 조회
export const getAnalysisResult = async (
  analysisId: number
): Promise<AnalysisResult> => {
  const { data } = await api.get<ApiResponse<AnalysisResult>>(
    `/api/v1/analysis/${analysisId}`
  );
  return data.data;
};

// 전체 업로드 + 분석 흐름
export const uploadAndAnalyze = async (file: File): Promise<AnalysisResult> => {
  const { presignedUrl, imageUrl } = await getPresignedUrl({
    fileName: file.name,
    contentType: file.type,
  });
  await uploadToS3(presignedUrl, file);
  return await requestAnalysis({ imageUrl });
};
