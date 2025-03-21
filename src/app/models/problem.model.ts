import { Tag } from './tag.model';

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  examples: Example[];
  solution: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface CreateProblemRequest {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tagIds: number[];
  examples: Omit<Example, 'id'>[];
}

export interface UpdateProblemRequest extends Partial<CreateProblemRequest> {
  id: number;
} 