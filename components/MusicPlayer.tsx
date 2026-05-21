"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MUSIC_SRC = "/audio/Ed_Sheeran_Perfect.mp3";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const ensureMusicSource = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return false;
    }

    if (audio.getAttribute("src") === MUSIC_SRC) {
      return true;
    }

    const response = await fetch(MUSIC_SRC, { method: "HEAD" });

    if (!response.ok) {
      return false;
    }

    audio.src = MUSIC_SRC;
    audio.load();

    return true;
  }, []);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || !audio.paused) {
      return true;
    }

    try {
      const hasMusicSource = await ensureMusicSource();

      if (!hasMusicSource) {
        return false;
      }

      audio.volume = 0.45;
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, [ensureMusicSource]);

  const stopMusic = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const autoplayTimer = window.setTimeout(() => {
      startMusic().then((started) => {
        if (started || controller.signal.aborted) {
          return;
        }

        const startAfterInteraction = (event: Event) => {
          if (event.target instanceof Element && event.target.closest(".music-toggle")) {
            return;
          }

          void startMusic();
        };

        window.addEventListener("pointerdown", startAfterInteraction, {
          signal: controller.signal,
        });
        window.addEventListener("keydown", startAfterInteraction, {
          once: true,
          signal: controller.signal,
        });
        window.addEventListener("touchstart", startAfterInteraction, {
          signal: controller.signal,
        });
      });
    }, 0);

    return () => {
      controller.abort();
      window.clearTimeout(autoplayTimer);
      stopMusic();
    };
  }, [startMusic, stopMusic]);

  const toggleMusic = () => {
    const audio = audioRef.current;

    if (!audio || !audio.paused) {
      stopMusic();
      return;
    }

    void startMusic();
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none" />
      <button
        type="button"
        className="music-toggle"
        aria-label={isPlaying ? "Отключить музыку" : "Включить музыку"}
        aria-pressed={isPlaying}
        onClick={toggleMusic}
      >
        <span
          className={isPlaying ? "music-toggle__icon is-playing" : "music-toggle__icon"}
          aria-hidden="true"
        />
      </button>
    </>
  );
}
