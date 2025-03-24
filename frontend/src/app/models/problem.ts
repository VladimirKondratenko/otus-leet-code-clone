import { Tag } from './tag';

export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
} 