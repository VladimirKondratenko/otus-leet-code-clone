import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  })
  difficulty: 'easy' | 'medium' | 'hard';

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => User, user => user.tasks)
  user: User;
} 