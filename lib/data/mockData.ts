/**
 * モックデータ
 * デモ用のサンプルコースデータ
 */

import { Course } from '@/lib/types';

/**
 * モックコースデータ
 */
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Next.js完全入門コース',
    description: 'Next.js 16を使ったモダンなWebアプリケーション開発を学ぶコースです。App Router、サーバーコンポーネント、データフェッチングなど、最新の機能を実践的に学習できます。',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    sections: [
      {
        id: '1-1',
        courseId: '1',
        title: 'イントロダクション',
        order: 1,
        videos: [
          {
            id: '1-1-1',
            sectionId: '1-1',
            title: 'コースの概要',
            description: 'このコースで学ぶ内容について説明します。',
            youtubeVideoId: 'jNQXAC9IVRw', // サンプル動画ID（有効な動画）
            duration: 180, // 3分
            order: 1,
          },
          {
            id: '1-1-2',
            sectionId: '1-1',
            title: '開発環境のセットアップ',
            description: 'Next.jsの開発環境を構築します。',
            youtubeVideoId: 'jNQXAC9IVRw', // サンプル動画ID
            duration: 600, // 10分
            order: 2,
          },
        ],
      },
      {
        id: '1-2',
        courseId: '1',
        title: 'App Routerの基礎',
        order: 2,
        videos: [
          {
            id: '1-2-1',
            sectionId: '1-2',
            title: 'App Routerとは',
            description: 'Next.js 13以降で導入されたApp Routerについて学びます。',
            youtubeVideoId: 'dQw4w9WgXcQ',
            duration: 900, // 15分
            order: 1,
          },
          {
            id: '1-2-2',
            sectionId: '1-2',
            title: 'ルーティングの基本',
            description: 'ファイルベースルーティングの仕組みを理解します。',
            youtubeVideoId: 'jNQXAC9IVRw',
            duration: 720, // 12分
            order: 2,
          },
          {
            id: '1-2-3',
            sectionId: '1-2',
            title: '動的ルーティング',
            description: '動的ルートパラメータの使い方を学びます。',
            youtubeVideoId: 'dQw4w9WgXcQ',
            duration: 840, // 14分
            order: 3,
          },
        ],
      },
      {
        id: '1-3',
        courseId: '1',
        title: 'サーバーコンポーネントとクライアントコンポーネント',
        order: 3,
        videos: [
          {
            id: '1-3-1',
            sectionId: '1-3',
            title: 'サーバーコンポーネントとは',
            description: 'サーバーコンポーネントの概念と使い方を学びます。',
            youtubeVideoId: 'jNQXAC9IVRw',
            duration: 960, // 16分
            order: 1,
          },
          {
            id: '1-3-2',
            sectionId: '1-3',
            title: 'クライアントコンポーネントの使い分け',
            description: 'いつクライアントコンポーネントを使うべきか学びます。',
            youtubeVideoId: 'dQw4w9WgXcQ',
            duration: 1080, // 18分
            order: 2,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'React 19実践ガイド',
    description: 'React 19の新機能とベストプラクティスを学ぶコースです。Server Components、Actions、新しいフックなど、最新のReact開発手法を習得できます。',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    sections: [
      {
        id: '2-1',
        courseId: '2',
        title: 'React 19の新機能',
        order: 1,
        videos: [
          {
            id: '2-1-1',
            sectionId: '2-1',
            title: 'React 19の概要',
            description: 'React 19で追加された新機能について説明します。',
            youtubeVideoId: 'dQw4w9WgXcQ',
            duration: 1200, // 20分
            order: 1,
          },
          {
            id: '2-1-2',
            sectionId: '2-1',
            title: 'Server Components入門',
            description: 'Server Componentsの基本を学びます。',
            youtubeVideoId: 'jNQXAC9IVRw',
            duration: 1500, // 25分
            order: 2,
          },
        ],
      },
      {
        id: '2-2',
        courseId: '2',
        title: 'パフォーマンス最適化',
        order: 2,
        videos: [
          {
            id: '2-2-1',
            sectionId: '2-2',
            title: 'メモ化のベストプラクティス',
            description: 'useMemoとuseCallbackの適切な使い方を学びます。',
            youtubeVideoId: 'dQw4w9WgXcQ',
            duration: 1800, // 30分
            order: 1,
          },
          {
            id: '2-2-2',
            sectionId: '2-2',
            title: 'コード分割と遅延読み込み',
            description: 'React.lazyとSuspenseを使った最適化手法を学びます。',
            youtubeVideoId: 'jNQXAC9IVRw',
            duration: 1320, // 22分
            order: 2,
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'TypeScript完全マスター',
    description: 'TypeScriptの基礎から応用まで、実践的な開発に必要な知識を身につけるコースです。型安全性、ジェネリクス、高度な型操作などを学びます。',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    sections: [
      {
        id: '3-1',
        courseId: '3',
        title: 'TypeScriptの基礎',
        order: 1,
        videos: [
          {
            id: '3-1-1',
            sectionId: '3-1',
            title: 'TypeScriptとは',
            description: 'TypeScriptの概要とメリットについて説明します。',
            youtubeVideoId: 'dQw4w9WgXcQ',
            duration: 900, // 15分
            order: 1,
          },
          {
            id: '3-1-2',
            sectionId: '3-1',
            title: '基本的な型',
            description: 'TypeScriptの基本的な型について学びます。',
            youtubeVideoId: 'jNQXAC9IVRw',
            duration: 1080, // 18分
            order: 2,
          },
        ],
      },
      {
        id: '3-2',
        courseId: '3',
        title: '高度な型操作',
        order: 2,
        videos: [
          {
            id: '3-2-1',
            sectionId: '3-2',
            title: 'ジェネリクス',
            description: 'ジェネリクスの使い方を学びます。',
            youtubeVideoId: 'dQw4w9WgXcQ',
            duration: 1500, // 25分
            order: 1,
          },
          {
            id: '3-2-2',
            sectionId: '3-2',
            title: 'ユーティリティ型',
            description: 'TypeScriptのユーティリティ型を活用します。',
            youtubeVideoId: 'jNQXAC9IVRw',
            duration: 1200, // 20分
            order: 2,
          },
        ],
      },
    ],
  },
];

/**
 * IDでコースを取得
 */
export function getCourseById(id: string): Course | undefined {
  return mockCourses.find((course) => course.id === id);
}

/**
 * すべてのコースを取得
 */
export function getAllCourses(): Course[] {
  return mockCourses;
}

/**
 * コース内のすべての動画を取得
 */
export function getAllVideosFromCourse(course: Course) {
  const videos: Array<{ video: Course['sections'][0]['videos'][0]; section: Course['sections'][0] }> = [];
  
  course.sections.forEach((section) => {
    section.videos.forEach((video) => {
      videos.push({ video, section });
    });
  });
  
  return videos;
}

/**
 * コース内の次の動画を取得
 */
export function getNextVideo(
  course: Course,
  currentVideoId: string
): { video: Course['sections'][0]['videos'][0]; section: Course['sections'][0] } | null {
  const allVideos = getAllVideosFromCourse(course);
  const currentIndex = allVideos.findIndex((item) => item.video.id === currentVideoId);
  
  if (currentIndex === -1 || currentIndex === allVideos.length - 1) {
    return null;
  }
  
  return allVideos[currentIndex + 1];
}

/**
 * コース内の前の動画を取得
 */
export function getPreviousVideo(
  course: Course,
  currentVideoId: string
): { video: Course['sections'][0]['videos'][0]; section: Course['sections'][0] } | null {
  const allVideos = getAllVideosFromCourse(course);
  const currentIndex = allVideos.findIndex((item) => item.video.id === currentVideoId);
  
  if (currentIndex <= 0) {
    return null;
  }
  
  return allVideos[currentIndex - 1];
}

/**
 * コース内の動画をIDで取得
 */
export function getVideoById(course: Course, videoId: string): { video: Course['sections'][0]['videos'][0]; section: Course['sections'][0] } | null {
  const allVideos = getAllVideosFromCourse(course);
  return allVideos.find((item) => item.video.id === videoId) || null;
}
