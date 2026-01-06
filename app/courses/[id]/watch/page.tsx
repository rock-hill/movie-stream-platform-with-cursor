'use client';

import { useEffect, useState, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCourseById,
  getAllVideosFromCourse,
  getVideoById,
  getNextVideo,
} from '@/lib/data/mockData';
import VideoPlayer from '@/app/components/video/VideoPlayer';
import CourseSidebar from '@/app/components/course/CourseSidebar';
import { markVideoAsCompleted } from '@/lib/utils/storage';
import type { Course } from '@/lib/types';

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

/**
 * 動画視聴ページ
 */
export default function WatchPage({ params }: WatchPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const courseData = getCourseById(resolvedParams.id);

    if (!courseData) {
      notFound();
      return;
    }

    setCourse(courseData);

    // クエリパラメータから動画IDを取得、なければ最初の動画
    const videoIdFromQuery = searchParams.get('video');
    const allVideos = getAllVideosFromCourse(courseData);
    const initialVideoId =
      videoIdFromQuery && getVideoById(courseData, videoIdFromQuery)
        ? videoIdFromQuery
        : allVideos[0]?.video.id || null;

    setCurrentVideoId(initialVideoId);
    setIsLoading(false);
  }, [resolvedParams.id, searchParams]);

  const handleVideoSelect = (videoId: string) => {
    setCurrentVideoId(videoId);
    // URLを更新（ブラウザの戻る/進むボタンに対応）
    router.push(`/courses/${course?.id}/watch?video=${videoId}`, {
      scroll: false,
    });
  };

  const handleVideoEnd = () => {
    if (!course || !currentVideoId) return;

    // 現在の動画を完了としてマーク
    markVideoAsCompleted(course.id, currentVideoId);

    // 次の動画を取得
    const nextVideoData = getNextVideo(course, currentVideoId);

    if (nextVideoData) {
      // 次の動画に自動遷移
      handleVideoSelect(nextVideoData.video.id);
    }
  };

  if (isLoading || !course || !currentVideoId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-500"></div>
          <p className="text-base font-medium text-gray-600 dark:text-gray-400">読み込み中...</p>
        </div>
      </div>
    );
  }

  const currentVideoData = getVideoById(course, currentVideoId);
  if (!currentVideoData) {
    notFound();
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md dark:border-gray-700/80 dark:bg-gray-800/80">
        <div className="mx-auto max-w-[1920px] px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="truncate text-lg font-bold text-gray-900 dark:text-white">
              {course.title}
            </h1>
            <Link
              href={`/courses/${course.id}`}
              className="ml-4 shrink-0 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              詳細に戻る
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* 左側: 動画プレーヤー */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl">
            <VideoPlayer
              videoId={currentVideoData.video.youtubeVideoId}
              onVideoEnd={handleVideoEnd}
            />

            {/* 動画情報 */}
            <div className="mt-4 rounded-xl bg-white p-4 shadow-sm sm:mt-6 sm:p-6 dark:bg-gray-800">
              <h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                {currentVideoData.video.title}
              </h2>
              {currentVideoData.video.description && (
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base dark:text-gray-300">
                  {currentVideoData.video.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 右側: カリキュラムサイドバー */}
        <aside className="w-full border-t border-gray-200 bg-white lg:h-[calc(100vh-81px)] lg:w-96 lg:border-l lg:border-t-0 dark:border-gray-700 dark:bg-gray-800">
          <CourseSidebar
            course={course}
            currentVideoId={currentVideoId}
            onVideoSelect={handleVideoSelect}
          />
        </aside>
      </div>
    </div>
  );
}
