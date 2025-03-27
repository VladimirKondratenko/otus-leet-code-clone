import { GetServerSideProps } from 'next';
import { AppDataSource } from '../../config/database.config';
import { Task } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';

interface TasksPageProps {
  tasks: {
    id: number;
    title: string;
    description: string;
    user: {
      username: string;
    };
  }[];
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
            <p className="text-sm text-gray-500">Автор: {task.user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await AppDataSource.initialize();
    const taskRepository = AppDataSource.getRepository(Task);
    
    const tasks = await taskRepository.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC'
      }
    });

    return {
      props: {
        tasks: tasks.map((task: Task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
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