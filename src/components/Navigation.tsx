import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">LeetCode Clone</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/problems" className="inline-flex items-center px-1 pt-1 text-gray-900">
                Задачи
              </Link>
              <Link href="/contests" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                Соревнования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 