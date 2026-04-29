const BASE_URL = '';

function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiClient<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { skipAuth = false, headers = {}, ...rest } = options;
  const token = getAccessToken();

  const mergedHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
    ...(!skipAuth && token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: mergedHeaders,
    ...rest,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(
      errorBody?.message ?? `API Error: ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
}