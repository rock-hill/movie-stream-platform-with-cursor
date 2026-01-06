'use client';

import { useVideoPlayer } from '@/app/hooks/useVideoPlayer';

interface VideoPlayerProps {
  videoId: string;
  onVideoEnd?: () => void;
}

/**
 * YouTubeエラーメッセージの取得
 */
function getErrorMessage(errorCode: number): string {
  const errorMessages: { [key: number]: string } = {
    2: 'リクエストに無効なパラメータ値が含まれています',
    5: 'HTML5プレーヤーで動画を再生できません',
    100: '動画が見つかりません。動画が削除された可能性があります。',
    101: 'この動画の埋め込み再生は許可されていません',
    150: 'この動画の埋め込み再生は許可されていません',
  };
  return errorMessages[errorCode] || '動画の読み込みに失敗しました';
}

/**
 * YouTube動画プレーヤーコンポーネント
 */
export default function VideoPlayer({ videoId, onVideoEnd }: VideoPlayerProps) {
  const { containerRef, isReady, error } = useVideoPlayer(videoId, onVideoEnd);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
      {error ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/95 p-8">
          <div className="mb-6 text-center text-white">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20">
              <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="mb-2 text-xl font-bold">動画を再生できません</p>
            <p className="text-sm text-gray-300">{getErrorMessage(error)}</p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-red-700 hover:shadow-xl active:scale-[0.98]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube で見る
          </a>
        </div>
      ) : !isReady ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-white"></div>
          <p className="text-sm font-medium text-white">読み込み中...</p>
        </div>
      ) : null}
      <div
        ref={containerRef}
        className="h-full w-full"
        id={`youtube-player-${videoId}`}
        key={videoId}
      />
    </div>
  );
}
