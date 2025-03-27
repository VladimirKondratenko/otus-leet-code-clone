import { GetServerSideProps } from 'next';
import { AppDataSource } from '../../config/database.config';
import { Task as TaskEntity } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';
import { Task } from '../../types/task.types';

interface TasksPageProps {
  tasks: Task[];
}

export default function TasksPage({ tasks }: TasksPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Список задач</h1>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Автор: {task.user.username}</p>
              <span className={`px-3 py-1 rounded-full text-sm ${
                task.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                task.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {task.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await AppDataSource.initialize();
    const taskRepository = AppDataSource.getRepository(TaskEntity);
    
    const tasks = await taskRepository.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC'
      }
    });

    return {
      props: {
        tasks: tasks.map((task: TaskEntity) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          difficulty: task.difficulty,
          user: {
            username: task.user.username
          }
        }))
      }
    };
  } catch (error) {
    console.error('Ошибка при загрузке задач:', error);
    return {
      props: {
        tasks: []
      }
    };
  }
}; 