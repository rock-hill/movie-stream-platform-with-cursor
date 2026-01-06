'use client';

import { Course } from '@/lib/types';
import { formatDuration } from '@/lib/utils/format';
import { useCourseProgress } from '@/app/hooks/useCourseProgress';
import { useRouter } from 'next/navigation';
// アイコンコンポーネント（lucide-reactの代わりにシンプルなSVGを使用）
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CircleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

interface CourseSidebarProps {
  course: Course;
  currentVideoId: string;
  onVideoSelect: (videoId: string) => void;
}

/**
 * カリキュラムサイドバーコンポーネント
 */
export default function CourseSidebar({
  course,
  currentVideoId,
  onVideoSelect,
}: CourseSidebarProps) {
  const router = useRouter();
  const totalVideos = course.sections.reduce(
    (sum, section) => sum + section.videos.length,
    0
  );
  const { checkIsCompleted, progressPercentage } = useCourseProgress(
    course.id,
    totalVideos
  );

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-800">
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <button
          onClick={() => router.push(`/courses/${course.id}`)}
          className="mb-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← コース詳細に戻る
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {course.title}
        </h2>
        <div className="mt-2">
          <div className="mb-1 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>進捗</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* カリキュラム */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {course.sections.map((section, sectionIndex) => (
          <div key={section.id} className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {sectionIndex + 1}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>
            </div>

            <ul className="ml-8 space-y-1">
              {section.videos.map((video) => {
                const isActive = video.id === currentVideoId;
                const isCompleted = checkIsCompleted(video.id);

                return (
                  <li key={video.id}>
                    <button
                      onClick={() => onVideoSelect(video.id)}
                      className={`group flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <span className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <CircleIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        )}
                      </span>
                      <span className="flex-1 truncate">{video.title}</span>
                      <span className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-500">
                        {formatDuration(video.duration)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
