export interface User {
  id: number;
  email: string;
  username: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  solvedProblems: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
} 