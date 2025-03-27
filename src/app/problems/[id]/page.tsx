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
async function getProblem(id: number) {
  // В реальном приложении здесь будет запрос к API
  return problems.find(p => p.id === id);
}

export default async function ProblemPage({ params }: { params: { id: string } }) {
  // Получаем данные на сервере
  const problem = await getProblem(parseInt(params.id));

  if (!problem) {
    return <div>Задача не найдена</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {problem.title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {problem.description}
        </p>
        <div className="mt-2">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {problem.difficulty}
          </span>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:px-6">
          <h4 className="text-md font-medium text-gray-900">Решение</h4>
          <div className="mt-4">
            <textarea
              rows={10}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Введите ваше решение..."
            />
          </div>
          <div className="mt-4">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Отправить решение
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 