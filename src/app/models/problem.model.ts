export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: Tag[];
  examples: ProblemExample[];
  createdAt: string;
  updatedAt: string;
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface Tag {
  id: number;
  name: string;
  problemCount: number;
}

export interface CreateProblemRequest {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tagIds: number[];
  examples: Omit<ProblemExample, 'id'>[];
}

export interface UpdateProblemRequest extends Partial<CreateProblemRequest> {
  id: number;
} 