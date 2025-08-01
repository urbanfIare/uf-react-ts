import api from "./api";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from "../types/auth";

export const authService = {
  // 로그인
  login: async (loginData: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post("/api/auth/login", loginData);
    const { token, user } = response.data;

    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  },

  // 회원가입
  register: async (
    registerData: RegisterRequest
  ): Promise<{ message: string; user: User }> => {
    const response = await api.post("/api/auth/register", registerData);
    return response.data;
  },

  // 로그아웃
  logout: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  // 현재 사용자 정보 가져오기
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // 인증 상태 확인
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },

  // 토큰 가져오기
  getToken: (): string | null => {
    return localStorage.getItem("token");
  },
};
