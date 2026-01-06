'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * YouTube動画プレーヤーのカスタムフック
 */
export function useVideoPlayer(videoId: string, onVideoEnd?: () => void) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const onVideoEndRef = useRef(onVideoEnd);
  const videoIdRef = useRef(videoId);

  // コールバックを最新の状態に保つ
  useEffect(() => {
    onVideoEndRef.current = onVideoEnd;
    // 動画IDが変更された場合はエラーをリセット
    if (videoIdRef.current !== videoId) {
      setError(null);
    }
    videoIdRef.current = videoId;
  }, [onVideoEnd, videoId]);

  const destroyPlayer = useCallback(() => {
    if (playerRef.current) {
      try {
        // プレーヤーを破棄する前に、コンテナの内容を手動でクリア
        // これにより、YouTube APIが内部でremoveChildを呼ぶ前にノードを削除
        if (containerRef.current) {
          // プレーヤーのiframeを直接削除
          const iframe = containerRef.current.querySelector('iframe');
          if (iframe && iframe.parentNode) {
            try {
              iframe.parentNode.removeChild(iframe);
            } catch (e) {
              // エラーは無視
            }
          }
          // コンテナをクリア
          containerRef.current.innerHTML = '';
        }
        // プレーヤーを破棄
        playerRef.current.destroy();
      } catch (e) {
        // エラーは無視（既に破棄されている可能性がある）
      }
      playerRef.current = null;
    }
  }, []);

  const initializePlayer = useCallback(() => {
    // コンテナが存在し、DOMに接続されていることを確認
    if (!containerRef.current || !window.YT) return;
    if (!containerRef.current.isConnected) return;

    // 既存のプレーヤーを破棄
    destroyPlayer();

    setIsReady(false);
    setError(null);

    try {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: videoIdRef.current,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            setIsReady(true);
            setIsPlaying(false);
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            // 動画が終了した時
            if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
              if (onVideoEndRef.current) {
                onVideoEndRef.current();
              }
            }
            // 動画が再生中
            else if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            }
            // 動画が一時停止
            else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
          onError: (event: YT.PlayerEvent) => {
            const errorCode = event.data;
            console.error('YouTube player error:', errorCode);
            setError(errorCode);
            setIsReady(false);
            
            // エラーコードの説明
            const errorMessages: { [key: number]: string } = {
              2: 'リクエストに無効なパラメータ値が含まれています',
              5: 'HTML5プレーヤーで動画を再生できません',
              100: '動画が見つかりません',
              101: '埋め込みが許可されていない動画です',
              150: '埋め込みが許可されていない動画です',
            };
            
            const errorMessage = errorMessages[errorCode] || '動画の読み込みに失敗しました';
            console.error(`Error ${errorCode}: ${errorMessage}`);
          },
        },
      });
    } catch (error) {
      console.error('Failed to initialize YouTube player:', error);
      setIsReady(false);
    }
  }, [destroyPlayer]);

  useEffect(() => {
    // コンテナが存在しない場合は何もしない
    if (!containerRef.current) return;

    // YouTube IFrame APIの読み込み
    if (!window.YT) {
      // 既に読み込み中の場合は待つ
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      
      if (existingScript) {
        // 既に読み込み中なので、onYouTubeIframeAPIReadyを設定
        const originalCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (originalCallback) originalCallback();
          // 少し遅延させて初期化（DOMが準備できていることを確認）
          setTimeout(() => {
            if (containerRef.current) {
              initializePlayer();
            }
          }, 100);
        };
        return;
      }

      // スクリプトタグを作成
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;

      // より安全な方法でスクリプトを追加
      // headまたはbodyに追加（どちらかが存在することを確認）
      const target = document.head || document.body;
      if (target) {
        // 既存のスクリプトの前に挿入を試みる
        const firstScriptTag = target.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          try {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          } catch (e) {
            // エラーが発生した場合は末尾に追加
            target.appendChild(tag);
          }
        } else {
          // スクリプトタグがない場合は先頭に追加
          target.insertBefore(tag, target.firstChild);
        }
      } else {
        // headもbodyもない場合は待つ（通常は発生しない）
        console.warn('Cannot find head or body element');
      }

      const originalCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (originalCallback) originalCallback();
        // 少し遅延させて初期化（DOMが準備できていることを確認）
        setTimeout(() => {
          if (containerRef.current) {
            initializePlayer();
          }
        }, 100);
      };
    } else {
      // APIが既に読み込まれている場合は即座に初期化
      // 少し遅延させてDOMが準備できていることを確認
      setTimeout(() => {
        if (containerRef.current) {
          initializePlayer();
        }
      }, 100);
    }

    return () => {
      destroyPlayer();
    };
  }, [initializePlayer]);

  // videoIdが変更されたときにプレーヤーを更新
  useEffect(() => {
    // プレーヤーが準備できていない、または同じ動画の場合は何もしない
    if (!playerRef.current || !window.YT || !isReady) return;
    if (videoIdRef.current === videoId) return;

    try {
      // 動画IDを更新
      videoIdRef.current = videoId;
      playerRef.current.loadVideoById(videoId);
      setIsReady(false);
      
      // 動画が読み込まれるまで待つ
      const checkReady = setInterval(() => {
        if (playerRef.current) {
          const state = playerRef.current.getPlayerState();
          // プレーヤーが準備できた（UNSTARTED以外の状態）
          if (state !== window.YT.PlayerState.UNSTARTED && state !== -1) {
            setIsReady(true);
            clearInterval(checkReady);
          }
        }
      }, 100);

      // タイムアウト（5秒）
      setTimeout(() => {
        clearInterval(checkReady);
        setIsReady(true);
      }, 5000);
    } catch (error) {
      console.error('Failed to load video:', error);
      // エラーが発生した場合は再初期化
      if (containerRef.current && containerRef.current.isConnected) {
        initializePlayer();
      }
    }
  }, [videoId, isReady, initializePlayer]);

  return {
    containerRef,
    isReady,
    isPlaying,
    error,
    player: playerRef.current,
  };
}

// YouTube IFrame APIの型定義
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}
