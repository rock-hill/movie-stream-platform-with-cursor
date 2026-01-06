import Link from 'next/link';

/**
 * コースが見つからない場合の404ページ
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
          <svg
            className="h-10 w-10 text-blue-600 dark:text-blue-400"
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
        <h1 className="mb-3 text-6xl font-bold text-gray-900 dark:text-white">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          コースが見つかりませんでした
        </h2>
        <p className="mb-8 text-base leading-relaxed text-gray-600 dark:text-gray-400">
          お探しのコースは存在しないか、削除された可能性があります。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          コース一覧に戻る
        </Link>
      </div>
    </div>
  );
}
