import Link from 'next/link';

interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  solvedCount: number;
}

// В реальном приложении это будет API-запрос
const problems: Problem[] = [
  {
    id: 1,
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    solvedCount: 1234
  },
  {
    id: 2,
    title: 'Add Two Numbers',
    description: 'You are given two non-empty linked lists representing two non-negative integers.',
    difficulty: 'Medium',
    solvedCount: 890
  }
];

// Функция для получения данных на сервере
async function getProblems() {
  // В реальном приложении здесь будет запрос к API
  return problems;
}

export default async function ProblemsPage() {
  // Получаем данные на сервере
  const problems = await getProblems();

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {problems.map((problem) => (
          <li key={problem.id}>
            <Link href={`/problems/${problem.id}`} className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {problem.title}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {problem.difficulty}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {problem.description}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Решено: {problem.solvedCount}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 