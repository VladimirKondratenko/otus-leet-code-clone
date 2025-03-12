import { User } from '../models/user.model';
import { Problem, Tag } from '../models/problem.model';

export interface AppState {
  auth: AuthState;
  problems: ProblemsState;
  tags: TagsState;
  users: UsersState;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface ProblemsState {
  problems: Problem[];
  selectedProblem: Problem | null;
  loading: boolean;
  error: string | null;
}

export interface TagsState {
  tags: Tag[];
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
} 