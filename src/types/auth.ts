export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    age: number;
    role: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}
