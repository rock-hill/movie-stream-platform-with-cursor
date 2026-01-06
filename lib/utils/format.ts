/**
 * フォーマットユーティリティ関数
 */

/**
 * 秒数を時間:分:秒の形式に変換
 * @param seconds 秒数
 * @returns フォーマットされた時間文字列（例: "1:23:45" または "23:45"）
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
