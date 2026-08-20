import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { HER_NAME, MY_NAME, SONG_URL } from "@/content";

const SceneLoading = lazy(() => import("@/components/birthday/scenes/SceneLoading"));
const SceneThreshold = lazy(() => import("@/components/birthday/scenes/SceneThreshold"));
const SceneLetter = lazy(() => import("@/components/birthday/scenes/SceneLetter"));
const ScenePhotos = lazy(() => import("@/components/birthday/scenes/ScenePhotos"));
const SceneHug = lazy(() => import("@/components/birthday/scenes/SceneHug"));
const SceneCake = lazy(() => import("@/components/birthday/scenes/SceneCake"));
const SceneFinale = lazy(() => import("@/components/birthday/scenes/SceneFinale"));

const TITLE = `Happy Birthday, ${HER_NAME}`;
const DESC = `A seven-scene cinematic birthday letter for ${HER_NAME}, made with love by ${MY_NAME}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayExperience,
});

const TOTAL = 7;

function BirthdayExperience() {
  const [scene, setScene] = useState(0);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lock = useRef(0);

  const go = useCallback((next: number) => {
    setScene((s) => {
      const target = Math.max(0, Math.min(TOTAL - 1, next));
      return target === s ? s : target;
    });
  }, []);

  const next = useCallback(() => go(scene + 1), [go, scene]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") go(scene + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") go(scene - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, scene]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 24) return;
      const now = Date.now();
      if (now - lock.current < 900) return;
      lock.current = now;
      go(scene + (e.deltaY > 0 ? 1 : -1));
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [go, scene]);

  const touchY = useRef(0);
  const touchX = useRef(0);

  const toggleMusic = () => {
    const el = audioRef.current;
    if (!el) return;
    if (muted) {
      el.muted = false;
      el.volume = 0.4;
      void el.play().catch(() => undefined);
      setMuted(false);
    } else {
      el.muted = true;
      setMuted(true);
    }
  };

  return (
    <main
      className="relative h-[100dvh] w-full overflow-hidden bg-ivory"
      onTouchStart={(e) => {
        touchY.current = e.touches[0]?.clientY ?? 0;
        touchX.current = e.touches[0]?.clientX ?? 0;
      }}
      onTouchEnd={(e) => {
        const dy = touchY.current - (e.changedTouches[0]?.clientY ?? 0);
        const dx = touchX.current - (e.changedTouches[0]?.clientX ?? 0);
        if (Math.abs(dy) > 70 && Math.abs(dy) > Math.abs(dx)) go(scene + (dy > 0 ? 1 : -1));
      }}
    >
      <h1 className="sr-only">
        Happy birthday, {HER_NAME} — from {MY_NAME}
      </h1>

      <Suspense fallback={<div className="absolute inset-0 bg-ivory" />}>
        <AnimatePresence mode="wait">
          {scene === 0 && <SceneLoading key="s0" onDone={() => go(1)} />}
          {scene === 1 && <SceneThreshold key="s1" onNext={next} />}
          {scene === 2 && <SceneLetter key="s2" onNext={next} />}
          {scene === 3 && <ScenePhotos key="s3" onNext={next} />}
          {scene === 4 && <SceneHug key="s4" onNext={next} />}
          {scene === 5 && <SceneCake key="s5" onNext={next} />}
          {scene === 6 && <SceneFinale key="s6" onReplay={() => go(0)} />}
        </AnimatePresence>
      </Suspense>

      {/* progress dots */}
      <nav
        aria-label="Scene progress"
        className="fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2.5"
      >
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to scene ${i + 1}`}
            aria-current={scene === i}
            onClick={() => go(i)}
            className="grid h-6 w-6 place-items-center"
          >
            <motion.span
              animate={{ scale: scene === i ? 1.5 : 1, opacity: scene === i ? 1 : 0.35 }}
              className={`block h-1.5 w-1.5 rounded-full ${
                scene === 0 || scene === 1 || scene === 5 ? "bg-gold" : "bg-wine"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* music toggle */}
      <button
        type="button"
        onClick={toggleMusic}
        aria-pressed={!muted}
        aria-label={muted ? "Unmute music" : "Mute music"}
        className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-wine/10 text-wine backdrop-blur-sm transition-transform active:scale-90"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          {muted ? (
            <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" fill="none" />
          ) : (
            <path
              d="M16.5 8.5a5 5 0 0 1 0 7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      <audio ref={audioRef} src={SONG_URL} loop muted preload="none" />
    </main>
  );
}
