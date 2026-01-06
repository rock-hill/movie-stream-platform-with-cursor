/**
 * YouTube IFrame APIの型定義
 */

declare namespace YT {
  interface PlayerEvent {
    target: Player;
    data: number;
  }

  interface OnStateChangeEvent {
    data: number;
    target: Player;
  }

  interface PlayerVars {
    autoplay?: 0 | 1;
    controls?: 0 | 1 | 2;
    rel?: 0 | 1;
    modestbranding?: 0 | 1;
    playsinline?: 0 | 1;
    enablejsapi?: 0 | 1;
    origin?: string;
  }

  interface PlayerOptions {
    height?: string | number;
    width?: string | number;
    videoId?: string;
    playerVars?: PlayerVars;
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
      onError?: (event: PlayerEvent) => void;
    };
  }

  class Player {
    constructor(containerId: string | HTMLElement, options: PlayerOptions);
    destroy(): void;
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead?: boolean): void;
    getCurrentTime(): number;
    getDuration(): number;
    getVideoUrl(): string;
    getVideoEmbedCode(): string;
    getPlayerState(): number;
  }

  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }
}
