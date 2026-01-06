/**
 * ローカルストレージ管理ユーティリティ
 */

import { CourseProgress } from '@/lib/types';

const STORAGE_PREFIX = 'courseProgress_';

/**
 * コースの視聴進捗を取得
 */
export function getCourseProgress(courseId: string): CourseProgress {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const data = localStorage.getItem(`${STORAGE_PREFIX}${courseId}`);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to get course progress:', error);
    return {};
  }
}

/**
 * コースの視聴進捗を保存
 */
export function saveCourseProgress(courseId: string, progress: CourseProgress): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(`${STORAGE_PREFIX}${courseId}`, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save course progress:', error);
  }
}

/**
 * 動画の視聴完了状態を更新
 */
export function markVideoAsCompleted(courseId: string, videoId: string): void {
  const progress = getCourseProgress(courseId);
  progress[videoId] = {
    completed: true,
    lastWatchedAt: Date.now(),
  };
  saveCourseProgress(courseId, progress);
}

/**
 * 動画が視聴済みかどうかを確認
 */
export function isVideoCompleted(courseId: string, videoId: string): boolean {
  const progress = getCourseProgress(courseId);
  return progress[videoId]?.completed ?? false;
}

/**
 * コースの視聴進捗率を計算（0-100）
 */
export function getCourseProgressPercentage(
  courseId: string,
  totalVideos: number
): number {
  if (totalVideos === 0) return 0;

  const progress = getCourseProgress(courseId);
  const completedCount = Object.values(progress).filter((p) => p.completed).length;
  return Math.round((completedCount / totalVideos) * 100);
}
