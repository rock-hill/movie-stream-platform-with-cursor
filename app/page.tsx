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
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            動画配信プラットフォーム
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            様々なコースを無料で視聴できます
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {courses.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              コースが見つかりませんでした
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                すべてのコース
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {courses.length} コースが利用可能です
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* フッター */}
      <footer className="mt-16 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2025 動画配信プラットフォーム. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
