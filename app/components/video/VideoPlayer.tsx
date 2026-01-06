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
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      {error ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/90 p-6">
          <div className="mb-4 text-center text-white">
            <p className="mb-2 text-lg font-semibold">動画を再生できません</p>
            <p className="text-sm text-gray-300">{getErrorMessage(error)}</p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            YouTube で見る
          </a>
        </div>
      ) : !isReady ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
          <div className="text-white">読み込み中...</div>
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
