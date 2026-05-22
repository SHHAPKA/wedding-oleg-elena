"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MUSIC_SRC = "/audio/Ed_Sheeran_Perfect.mp3";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const manuallyPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || !audio.paused) {
      return true;
    }

    try {
      audio.volume = 0.45;
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, []);

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
    const startAfterInteraction = (event: Event) => {
      if (
        manuallyPausedRef.current ||
        (event.target instanceof Element && event.target.closest(".music-toggle"))
      ) {
        return;
      }

      void startMusic();
    };

    window.addEventListener("pointerdown", startAfterInteraction, {
      signal: controller.signal,
    });
    window.addEventListener("keydown", startAfterInteraction, {
      signal: controller.signal,
    });
    window.addEventListener("touchstart", startAfterInteraction, {
      passive: true,
      signal: controller.signal,
    });
    window.addEventListener("touchend", startAfterInteraction, {
      passive: true,
      signal: controller.signal,
    });

    const autoplayTimer = window.setTimeout(() => {
      void startMusic();
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
      manuallyPausedRef.current = true;
      stopMusic();
      return;
    }

    manuallyPausedRef.current = false;
    void startMusic();
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="none" />
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
