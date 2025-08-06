import { authService } from "../services/authService";

// API 호출을 위한 기본 헤더 생성
export const getAuthHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// API 호출을 위한 기본 설정 생성
export const getApiConfig = (method: string = "GET", body?: unknown) => {
  const config: RequestInit = {
    method,
    headers: getAuthHeaders(),
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return config;
};

// API 호출 함수
export const apiCall = async (url: string, config: RequestInit = {}) => {
  const defaultConfig = getApiConfig();
  const finalConfig = {
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...config.headers,
    },
  };

  const response = await fetch(url, finalConfig);

  if (!response.ok) {
    if (response.status === 401) {
      // 인증 실패 시 로그아웃 처리
      authService.logout();
      window.location.href = "/login";
      throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
    }

    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API 호출 실패: ${response.status}`);
  }

  return response;
};
