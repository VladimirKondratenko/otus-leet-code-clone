export interface TaskFields {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Task extends TaskFields {
  id: number;
  user: {
    username: string;
  };
} 