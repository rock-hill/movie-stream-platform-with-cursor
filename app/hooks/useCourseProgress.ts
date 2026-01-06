'use client';

import { useEffect, useState } from 'react';
import {
  getCourseProgress,
  isVideoCompleted,
  markVideoAsCompleted,
  getCourseProgressPercentage,
} from '@/lib/utils/storage';
import { CourseProgress } from '@/lib/types';

/**
 * コースの視聴進捗を管理するカスタムフック
 */
export function useCourseProgress(courseId: string, totalVideos: number) {
  const [progress, setProgress] = useState<CourseProgress>({});
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const courseProgress = getCourseProgress(courseId);
    setProgress(courseProgress);
    setProgressPercentage(getCourseProgressPercentage(courseId, totalVideos));
  }, [courseId, totalVideos]);

  const completeVideo = (videoId: string) => {
    markVideoAsCompleted(courseId, videoId);
    const updatedProgress = getCourseProgress(courseId);
    setProgress(updatedProgress);
    setProgressPercentage(getCourseProgressPercentage(courseId, totalVideos));
  };

  const checkIsCompleted = (videoId: string): boolean => {
    return isVideoCompleted(courseId, videoId);
  };

  return {
    progress,
    progressPercentage,
    completeVideo,
    checkIsCompleted,
  };
}
