import { GetServerSideProps } from 'next';
import { AppDataSource } from '../../config/database.config';
import { User } from '../../entities/user.entity';

interface UsersPageProps {
  users: {
    id: number;
    username: string;
    email: string;
  }[];
}

export default function UsersPage({ users }: UsersPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Список пользователей</h1>
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(User);
    
    const users = await userRepository.find({
      order: {
        username: 'ASC'
      }
    });

    return {
      props: {
        users: users.map((user: User) => ({
          id: user.id,
          username: user.username,
          email: user.email
        }))
      }
    };
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
    return {
      props: {
        users: []
      }
    };
  }
}; 