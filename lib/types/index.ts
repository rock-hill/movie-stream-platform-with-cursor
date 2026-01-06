/**
 * 動画配信プラットフォームの型定義
 */

/**
 * 動画（Video）
 */
export interface Video {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  youtubeVideoId: string;
  duration: number; // 秒単位
  order: number;
}

/**
 * セクション（Section）
 */
export interface Section {
  id: string;
  courseId: string;
  title: string;
  order: number;
  videos: Video[];
}

/**
 * コース（Course）
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  sections: Section[];
}

/**
 * コースの視聴進捗（CourseProgress）
 */
export interface CourseProgress {
  [videoId: string]: {
    completed: boolean;
    lastWatchedAt: number; // タイムスタンプ
  };
}

/**
 * 動画視聴ページのクエリパラメータ
 */
export interface WatchPageParams {
  courseId: string;
  videoId?: string;
}
