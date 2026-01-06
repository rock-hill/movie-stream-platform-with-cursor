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
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← コース一覧に戻る
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 左側: コース情報 */}
          <div className="lg:col-span-2">
            {/* コースサムネイル */}
            <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/* コースタイトル */}
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              {course.title}
            </h1>

            {/* コース説明 */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                コースについて
              </h2>
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                {course.description}
              </p>
            </div>

            {/* カリキュラム */}
            <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
              <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  カリキュラム
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {course.sections.length} セクション • {totalVideos} 動画 • {formatDuration(totalDuration)}
                </p>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {course.sections.map((section, sectionIndex) => (
                  <div key={section.id} className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        {sectionIndex + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                      <span className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                        {section.videos.length} 動画
                      </span>
                    </div>

                    <ul className="ml-11 space-y-2">
                      {section.videos.map((video, videoIndex) => (
                        <li
                          key={video.id}
                          className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                            {videoIndex + 1}
                          </span>
                          <span className="flex-1">{video.title}</span>
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
            <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  コース情報
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>セクション数:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {course.sections.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>動画数:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {totalVideos}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>総時間:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDuration(totalDuration)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 「コースを見る」ボタン */}
              {firstVideo && (
                <Link
                  href={`/courses/${course.id}/watch${firstVideo ? `?video=${firstVideo.id}` : ''}`}
                  className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
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
