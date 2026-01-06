import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCourseById, getAllVideosFromCourse } from '@/lib/data/mockData';
import { formatDuration } from '@/lib/utils/format';

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * 動的メタデータを生成
 */
export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    return {
      title: 'コースが見つかりません | 動画配信プラットフォーム',
    };
  }

  return {
    title: `${course.title} | 動画配信プラットフォーム`,
    description: course.description,
  };
}

/**
 * コース詳細ページ
 */
export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  // コースの統計情報を計算
  const totalVideos = course.sections.reduce(
    (sum, section) => sum + section.videos.length,
    0
  );
  const totalDuration = course.sections.reduce(
    (sum, section) => sum + section.videos.reduce((s, v) => s + v.duration, 0),
    0
  );
  const allVideos = getAllVideosFromCourse(course);
  const firstVideo = allVideos[0]?.video;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md dark:border-gray-700/80 dark:bg-gray-800/80">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            コース一覧に戻る
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 左側: コース情報 */}
          <div className="lg:col-span-2">
            {/* コースサムネイル */}
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg dark:bg-gray-800">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>

            {/* コースタイトル */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {course.title}
            </h1>

            {/* コース説明 */}
            <div className="mb-8 rounded-xl bg-white p-8 shadow-sm dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                コースについて
              </h2>
              <div className="prose prose-gray max-w-none dark:prose-invert">
                <p className="whitespace-pre-line text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  {course.description}
                </p>
              </div>
            </div>

            {/* カリキュラム */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800">
              <div className="border-b border-gray-200 bg-gray-50 px-8 py-6 dark:border-gray-700 dark:bg-gray-800/50">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  カリキュラム
                </h2>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {course.sections.length} セクション
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {totalVideos} 動画
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDuration(totalDuration)}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {course.sections.map((section, sectionIndex) => (
                  <div key={section.id} className="p-6 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
                        {sectionIndex + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {section.title}
                        </h3>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {section.videos.length} 動画
                      </span>
                    </div>

                    <ul className="ml-14 space-y-2">
                      {section.videos.map((video, videoIndex) => (
                        <li
                          key={video.id}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-100 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            {videoIndex + 1}
                          </span>
                          <span className="flex-1 font-medium text-gray-700 dark:text-gray-300">
                            {video.title}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {formatDuration(video.duration)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右側: サイドバー */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                  コース情報
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">セクション数</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {course.sections.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">動画数</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {totalVideos}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">総時間</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatDuration(totalDuration)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 「コースを見る」ボタン */}
              {firstVideo && (
                <Link
                  href={`/courses/${course.id}/watch${firstVideo ? `?video=${firstVideo.id}` : ''}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  コースを見る
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
