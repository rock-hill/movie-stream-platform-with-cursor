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
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-700 dark:bg-gray-800">
        <button
          onClick={() => router.push(`/courses/${course.id}`)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 active:scale-95 dark:text-gray-400 dark:hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          コース詳細に戻る
        </button>
        <h2 className="mb-4 text-base font-bold text-gray-900 sm:text-lg dark:text-white line-clamp-2">
          {course.title}
        </h2>
        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-700 dark:text-gray-300">
            <span>進捗</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-blue-600 transition-all duration-500 ease-out dark:bg-blue-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* カリキュラム */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {course.sections.map((section, sectionIndex) => (
          <div key={section.id} className="p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">
                {sectionIndex + 1}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>
            </div>

            <ul className="ml-10 space-y-1">
              {section.videos.map((video) => {
                const isActive = video.id === currentVideoId;
                const isCompleted = checkIsCompleted(video.id);

                return (
                  <li key={video.id}>
                    <button
                      onClick={() => onVideoSelect(video.id)}
                      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 active:scale-[0.98] ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-900/30 dark:text-blue-300'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <span className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircleIcon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`} />
                        ) : (
                          <CircleIcon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} />
                        )}
                      </span>
                      <span className="flex-1 truncate font-medium">{video.title}</span>
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
