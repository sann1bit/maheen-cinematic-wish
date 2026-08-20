import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Scene, Particles, Sticker, CuteButton, Confetti } from "../shared";

export default function SceneCake({ onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [out, setOut] = useState(false);
  const raf = useRef<number | null>(null);
  const holding = useRef(false);

  useEffect(() => {
    const tick = () => {
      setProgress((p) => {
        const next = holding.current ? p + 1.6 : Math.max(0, p - 2.4);
        if (next >= 100) {
          holding.current = false;
          setOut(true);
          return 100;
        }
        return next;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const start = () => {
    if (!out) holding.current = true;
  };
  const stop = () => {
    holding.current = false;
  };

  return (
    <Scene dark>
      <Particles tone="dark" count={12} />
      <Sticker name="star" className="left-8 top-16 h-7 w-7" />
      <Sticker name="cat" className="right-6 bottom-24 h-11 w-11" delay={0.5} />
      <Confetti active={out} />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="font-display text-3xl text-cream">Cake Time</h2>
        <p className="mt-2 text-sm text-cream/60">
          {out ? "make a wish." : "Press and hold to blow out the candle"}
        </p>

        <motion.button
          type="button"
          aria-label="Press and hold to blow out the candle"
          onPointerDown={start}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") start();
          }}
          onKeyUp={stop}
          whileTap={{ scale: 0.97 }}
          className="mt-8 rounded-3xl p-4"
        >
          <svg viewBox="0 0 200 200" className="h-56 w-56 sm:h-64 sm:w-64">
            {/* candle */}
            <rect x="95" y="58" width="10" height="30" rx="5" fill="var(--cream)" />
            <AnimatePresence>
              {!out && (
                <motion.ellipse
                  key="flame"
                  cx="100"
                  cy="48"
                  rx="7"
                  ry="12"
                  fill="var(--gold)"
                  initial={{ opacity: 0 }}
                  animate={
                    reduce
                      ? { opacity: 1 }
                      : {
                          opacity: 1,
                          scaleY: [1, 0.85, 1.05, 1],
                          x: [0, 1.5 + progress / 20, -1.5 - progress / 20, 0],
                        }
                  }
                  exit={{ opacity: 0, scale: 0.2, y: -14 }}
                  transition={{ duration: 0.6, repeat: out ? 0 : Infinity }}
                  style={{ transformOrigin: "100px 60px" }}
                />
              )}
            </AnimatePresence>
            {out && (
              <motion.path
                d="M100 46c-4 -10 6 -14 2 -24"
                stroke="var(--cream)"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
                initial={{ pathLength: 0, opacity: 0.6 }}
                animate={{ pathLength: 1, opacity: 0, y: -20 }}
                transition={{ duration: 1.6 }}
              />
            )}
            {/* cake */}
            <rect x="52" y="88" width="96" height="30" rx="12" fill="var(--blush)" />
            <rect x="44" y="114" width="112" height="36" rx="14" fill="var(--wine)" />
            <rect x="36" y="146" width="128" height="26" rx="12" fill="var(--gold)" />
            <path
              d="M52 96c8 8 16 8 24 0s16-8 24 0 16 8 24 0"
              stroke="var(--cream)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="70" cy="132" r="3.5" fill="var(--blush)" />
            <circle cx="100" cy="128" r="3.5" fill="var(--blush)" />
            <circle cx="130" cy="134" r="3.5" fill="var(--blush)" />
          </svg>
        </motion.button>

        <div className="mt-4 h-1.5 w-44 overflow-hidden rounded-full bg-cream/15">
          <div
            className="h-full rounded-full bg-gold transition-[width] duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <AnimatePresence>
          {out && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <p className="font-script text-3xl text-gold">make a wish.</p>
              <div className="mt-6">
                <CuteButton variant="gold" onClick={onNext}>
                  One more thing
                </CuteButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  );
}
