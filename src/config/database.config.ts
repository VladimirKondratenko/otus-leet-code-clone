import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Task } from '../entities/task.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'task_management',
  entities: [User, Task],
  synchronize: true, // Не использовать в продакшене!
  logging: true,
}); 