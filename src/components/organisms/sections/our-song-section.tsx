"use client";

import { SectionShell } from "@/components/atoms/section-shell";
import { translate } from "@/components/organisms/sections/helpers";
import { OurSongSectionProps } from "@/components/organisms/sections/types";
import { DEFAULT_SONG_DISPLAY_TITLE } from "@/config/modules";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function resolveAudioSrc(audioUrl: string): string {
  const t = audioUrl.trim();
  if (!t) return "/audio/gala_free_from_desiree.mp3";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  return t.startsWith("/") ? t : `/${t}`;
}

function resolveTrackLabel(
  props: OurSongSectionProps["props"],
  locale: OurSongSectionProps["locale"]
): string {
  const custom = translate(props.songTitle, locale).trim();
  if (custom) return custom;
  const tr = translate(props.trackName, locale).trim();
  const ar = translate(props.artistName, locale).trim();
  if (tr && ar) return `${tr} — ${ar}`;
  if (tr) return tr;
  if (ar) return ar;
  return DEFAULT_SONG_DISPLAY_TITLE;
}

export function OurSongSection({ props, locale, theme }: OurSongSectionProps) {
  const isAmorea = theme.sectionCard.includes("invitation-amorea-section");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const src = useMemo(() => resolveAudioSrc(props.audioUrl), [props.audioUrl]);
  const trackLabel = useMemo(() => resolveTrackLabel(props, locale), [props, locale]);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setPlaying(false);
    setProgress(0);
    el.load();
  }, [src]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => {
      if (el.duration && Number.isFinite(el.duration)) {
        setProgress((el.currentTime / el.duration) * 100);
      }
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
    };
  }, [src]);

  const seekFromClientX = useCallback((clientX: number) => {
    const audio = audioRef.current;
    const bar = progressBarRef.current;
    if (!audio || !bar) return;
    const d = audio.duration;
    if (!Number.isFinite(d) || d <= 0) return;
    const rect = bar.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * d;
  }, []);

  const onProgressBarPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      e.preventDefault();
      seekFromClientX(e.clientX);
      const bar = e.currentTarget;
      bar.setPointerCapture(e.pointerId);

      const onMove = (ev: PointerEvent) => {
        seekFromClientX(ev.clientX);
      };
      const onUp = (ev: PointerEvent) => {
        bar.releasePointerCapture(ev.pointerId);
        bar.removeEventListener("pointermove", onMove);
        bar.removeEventListener("pointerup", onUp);
        bar.removeEventListener("pointercancel", onUp);
      };
      bar.addEventListener("pointermove", onMove);
      bar.addEventListener("pointerup", onUp);
      bar.addEventListener("pointercancel", onUp);
    },
    [seekFromClientX]
  );

  const onProgressBarKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const step = (e.key === "ArrowLeft" ? -5 : 5) * (audio.duration / 100);
        audio.currentTime = Math.min(Math.max(audio.currentTime + step, 0), audio.duration);
      }
    },
    []
  );

  const player = (
    <>
      <audio ref={audioRef} src={src} preload="metadata" className="sr-only" />
      <div className={isAmorea ? "amorea-song-player" : "amorea-song-player mx-auto flex max-w-sm items-center gap-3 rounded-md border border-blue-100 px-3 py-2"}>
        <button
          type="button"
          className={isAmorea ? "amorea-song-play" : "inline-flex h-8 w-8 items-center justify-center rounded-full"}
          aria-label={playing ? "Pause" : "Play"}
          onClick={togglePlay}
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <rect fill={isAmorea ? "#fff" : "currentColor"} x="1" y="1" width="3.5" height="10" rx="1" />
              <rect fill={isAmorea ? "#fff" : "currentColor"} x="7.5" y="1" width="3.5" height="10" rx="1" />
            </svg>
          ) : (
            <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
              <polygon fill={isAmorea ? "#fff" : "currentColor"} points="0,0 10,6 0,12" />
            </svg>
          )}
        </button>
        <div className={isAmorea ? "amorea-song-track" : "text-left"}>
          <p className="amorea-song-title">{trackLabel}</p>
        </div>
      </div>
      <div
        ref={progressBarRef}
        role="slider"
        tabIndex={0}
        aria-label="Seek in track"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className={
          isAmorea
            ? "amorea-music-bar"
            : "mx-auto mt-2 min-h-2.5 max-w-sm cursor-pointer touch-none overflow-hidden rounded bg-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        }
        onPointerDown={onProgressBarPointerDown}
        onKeyDown={onProgressBarKeyDown}
      >
        <div
          className={
            (isAmorea ? "amorea-music-progress" : "h-full min-h-2.5 bg-blue-400") +
            " pointer-events-none transition-[width] duration-75"
          }
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );

  if (isAmorea) {
    return (
      <SectionShell showHeading={false} title={translate(props.title, locale)} cardClassName={theme.sectionCard}>
        <div className="amorea-music-section amorea-song-card--exact">
          <span className="amorea-song-kicker amorea-music-label">{translate(props.title, locale)}</span>
          {player}
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell title={translate(props.title, locale)} cardClassName={theme.sectionCard}>
      <div className="amorea-song-card rounded-md border border-blue-100 bg-white p-4">
        <p className="amorea-song-kicker mb-3 text-center">{translate(props.title, locale)}</p>
        {player}
      </div>
    </SectionShell>
  );
}
