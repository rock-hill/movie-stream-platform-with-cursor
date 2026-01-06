'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/lib/types';

interface CourseCardProps {
  course: Course;
}

/**
 * コースカードコンポーネント
 * コースのサムネイル、タイトル、説明を表示し、クリックで詳細ページに遷移
 */
export default function CourseCard({ course }: CourseCardProps) {
  // コース内の動画総数を計算
  const totalVideos = course.sections.reduce(
    (sum, section) => sum + section.videos.length,
    0
  );

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group block h-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
    >
      {/* サムネイル */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
      </div>
      
      {/* コンテンツ */}
      <div className="p-6">
        <h3 className="mb-3 text-xl font-bold leading-tight text-gray-900 transition-colors duration-200 line-clamp-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {course.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3 dark:text-gray-400">
          {course.description}
        </p>
        
        {/* メタ情報 */}
        <div className="flex items-center gap-6 border-t border-gray-100 pt-4 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {course.sections.length} セクション
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {totalVideos} 動画
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
