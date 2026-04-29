import axios from 'axios';
import type {
  ApiResponse,
  PokedexRes,
  AnalysisRes,
  PageAnalysisRes,
} from '@/types/collection';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getMyPokedex(): Promise<PokedexRes> {
  const res = await api.get<ApiResponse<PokedexRes>>('/api/v1/pokedex');
  return res.data.data;
}

export async function getMyAnalysisList(
  page = 0,
  size = 10,
): Promise<PageAnalysisRes> {
  const res = await api.get<ApiResponse<PageAnalysisRes>>(
    `/api/v1/analysis/my?page=${page}&size=${size}`,
  );
  return res.data.data;
}

export async function getAnalysisById(id: number): Promise<AnalysisRes> {
  const res = await api.get<ApiResponse<AnalysisRes>>(
    `/api/v1/analysis/${id}`,
  );
  return res.data.data;
}