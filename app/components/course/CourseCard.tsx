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
      className="group block h-full rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {course.title}
        </h3>
        <p className="mb-3 text-sm text-gray-600 line-clamp-2 dark:text-gray-400">
          {course.description}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
          <span>{course.sections.length} セクション</span>
          <span>{totalVideos} 動画</span>
        </div>
      </div>
    </Link>
  );
}
