import { AppDataSource } from './config/database.config';
import { User } from './entities/user.entity';
import { Task } from './entities/task.entity';

async function main() {
  try {
    await AppDataSource.initialize();
    console.log('База данных успешно подключена');

    // Пример создания пользователя
    const userRepository = AppDataSource.getRepository(User);
    const taskRepository = AppDataSource.getRepository(Task);

    const user = new User();
    user.username = 'test_user';
    user.email = 'test@example.com';
    user.password = 'password123';
    await userRepository.save(user);

    // Пример создания задачи
    const task = new Task();
    task.title = 'Тестовая задача';
    task.description = 'Описание тестовой задачи';
    task.user = user;
    await taskRepository.save(task);

  } catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);
  }
}

main(); 