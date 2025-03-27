export interface User {
  id: number;
  email: string;
  username: string;
  role: 'user' | 'admin' | 'interviewer';
  rating: number;
  solvedProblems: number;
  isBlocked: boolean;
}

export interface Tag {
  id: number;
  name: string;
  problemCount: number;
}

export interface Example {
  input: string;
  output: string;
  explanation: string;
}

export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: Tag[];
  examples: Example[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
} 