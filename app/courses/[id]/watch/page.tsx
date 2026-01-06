'use client';

import { useEffect, useState, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
          <div className="mb-4 text-gray-600 dark:text-gray-400">読み込み中...</div>
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
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-[1920px] px-4 py-3 sm:px-6 lg:px-8">
          <h1 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
            {course.title}
          </h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* 左側: 動画プレーヤー */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="mx-auto max-w-5xl">
            <VideoPlayer
              videoId={currentVideoData.video.youtubeVideoId}
              onVideoEnd={handleVideoEnd}
            />

            {/* 動画情報 */}
            <div className="mt-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
              <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {currentVideoData.video.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {currentVideoData.video.description}
              </p>
            </div>
          </div>
        </div>

        {/* 右側: カリキュラムサイドバー */}
        <aside className="w-full border-t border-gray-200 bg-white lg:h-[calc(100vh-73px)] lg:w-80 lg:border-l lg:border-t-0 dark:border-gray-700 dark:bg-gray-800">
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
