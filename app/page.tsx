import { getAllCourses } from '@/lib/data/mockData';
import CourseCard from '@/app/components/course/CourseCard';

export const metadata = {
  title: '動画配信プラットフォーム | コース一覧',
  description: 'Udemy Clone風の動画配信プラットフォーム。様々なコースを無料で視聴できます。',
};

/**
 * トップページ（コース一覧ページ）
 */
export default function Home() {
  const courses = getAllCourses();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md dark:border-gray-700/80 dark:bg-gray-800/80">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                動画配信プラットフォーム
              </h1>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                様々なコースを無料で視聴できます
              </p>
            </div>
            {/* ロゴやアイコンを追加する場合はここに */}
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {courses.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg
                className="h-8 w-8 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              コースが見つかりませんでした
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              新しいコースが追加されるまでお待ちください
            </p>
          </div>
        ) : (
          <>
            {/* ページヘッダー */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                すべてのコース
              </h2>
              <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {courses.length}
                </span>{' '}
                コースが利用可能です
              </p>
            </div>

            {/* コースグリッド */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* フッター */}
      <footer className="mt-24 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              動画配信プラットフォーム
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              © 2025 All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
