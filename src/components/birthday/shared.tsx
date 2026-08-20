import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/* ---------------- Scene wrapper ---------------- */

export function Scene({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.99 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -24, scale: 0.99 }}
      transition={{ duration: reduce ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`paper-grain absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-6 py-16 ${
        dark ? "bg-plum text-cream" : "bg-ivory text-espresso"
      } ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ---------------- Playful tap button ---------------- */

export function CuteButton({
  children,
  onClick,
  variant = "wine",
  className = "",
  ...rest
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "wine" | "gold" | "ghost";
  className?: string;
} & Omit<React.ComponentProps<typeof motion.button>, "children" | "onClick">) {
  const styles: Record<string, string> = {
    wine: "bg-wine text-cream shadow-[0_10px_24px_-12px_rgba(60,20,30,0.8)]",
    gold: "bg-gold text-plum shadow-[0_10px_24px_-12px_rgba(60,40,20,0.7)]",
    ghost: "bg-transparent border border-gold/60 text-current",
  };
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9, rotate: -1.5 }}
      transition={{ type: "spring", stiffness: 500, damping: 14 }}
      className={`min-h-[48px] rounded-full px-7 text-sm font-semibold tracking-wide ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

/* ---------------- Cute stickers ---------------- */

type StickerName = "teddy" | "cat" | "heart" | "star" | "ribbon";

function StickerGlyph({ name }: { name: StickerName }) {
  const wine = "var(--wine)";
  const gold = "var(--gold)";
  const blush = "var(--blush)";
  switch (name) {
    case "teddy":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <circle cx="18" cy="16" r="9" fill={wine} />
          <circle cx="46" cy="16" r="9" fill={wine} />
          <circle cx="18" cy="16" r="4.5" fill={blush} />
          <circle cx="46" cy="16" r="4.5" fill={blush} />
          <circle cx="32" cy="34" r="21" fill={wine} />
          <ellipse cx="32" cy="40" rx="11" ry="9" fill={blush} />
          <circle cx="25" cy="30" r="2.6" fill="#241522" />
          <circle cx="39" cy="30" r="2.6" fill="#241522" />
          <circle cx="32" cy="37" r="2.4" fill="#241522" />
          <path d="M32 39c0 3-3 4-5 3M32 39c0 3 3 4 5 3" stroke="#241522" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "cat":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <path d="M14 26 L16 8 L28 18 Z" fill={gold} />
          <path d="M50 26 L48 8 L36 18 Z" fill={gold} />
          <circle cx="32" cy="36" r="20" fill={gold} />
          <circle cx="24" cy="33" r="2.6" fill="#241522" />
          <circle cx="40" cy="33" r="2.6" fill="#241522" />
          <path d="M32 39c-2 3-5 2-6 0M32 39c2 3 5 2 6 0" stroke="#241522" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M8 34h10M8 40h10M56 34H46M56 40H46" stroke="#241522" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <path
            d="M32 54S6 38 6 22C6 13 13 7 21 7c5 0 9 3 11 6 2-3 6-6 11-6 8 0 15 6 15 15 0 16-26 32-26 32Z"
            fill={wine}
          />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <path d="M32 4l7 18 19 1-15 12 5 19-16-11-16 11 5-19L6 23l19-1z" fill={gold} />
        </svg>
      );
    case "ribbon":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <path d="M32 32 6 16v22z" fill={blush} />
          <path d="M32 32 58 16v22z" fill={blush} />
          <circle cx="32" cy="32" r="7" fill={wine} />
        </svg>
      );
  }
}

export function Sticker({
  name,
  className = "",
  delay = 0,
}: {
  name: StickerName;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute opacity-80 ${className}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={
        reduce
          ? { opacity: 0.8, scale: 1 }
          : { opacity: 0.8, scale: 1, y: [0, -8, 0], rotate: [-4, 4, -4] }
      }
      transition={
        reduce
          ? { duration: 0.3 }
          : { delay, opacity: { duration: 0.6 }, scale: { duration: 0.6 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" } }
      }
    >
      <StickerGlyph name={name} />
    </motion.div>
  );
}

/* ---------------- Floating particles ---------------- */

export function Particles({ tone = "light", count = 16 }: { tone?: "light" | "dark"; count?: number }) {
  const reduce = useReducedMotion();
  const [bits] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 5 + Math.random() * 10,
      delay: Math.random() * 10,
      dur: 14 + Math.random() * 14,
      kind: i % 3,
    })),
  );
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          className="absolute block"
          style={{ left: `${b.left}%`, top: "-8%", width: b.size, height: b.size }}
          animate={{ y: ["0vh", "110vh"], x: [0, 24, -18, 0], rotate: [0, 180, 360] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "linear" }}
        >
          {b.kind === 0 ? (
            <svg viewBox="0 0 24 24" className="h-full w-full">
              <path
                d="M12 21S3 14 3 8.5C3 5.5 5.4 3 8.4 3c1.6 0 3 .8 3.6 2 .6-1.2 2-2 3.6-2C18.6 3 21 5.5 21 8.5 21 14 12 21 12 21Z"
                fill={tone === "dark" ? "var(--gold)" : "var(--wine)"}
                opacity="0.35"
              />
            </svg>
          ) : b.kind === 1 ? (
            <span
              className="block h-full w-full rounded-full"
              style={{
                background: tone === "dark" ? "var(--gold)" : "var(--blush)",
                opacity: 0.5,
              }}
            />
          ) : (
            <span
              className="block h-full w-full"
              style={{
                background: tone === "dark" ? "var(--blush)" : "var(--gold)",
                opacity: 0.35,
                borderRadius: "60% 0 60% 0",
              }}
            />
          )}
        </motion.span>
      ))}
    </div>
  );
}

/* ---------------- Kiss mark layer ---------------- */

export type Kiss = { id: number; x: number; y: number; rot: number };

export function useKisses() {
  const [kisses, setKisses] = useState<Kiss[]>([]);
  const idRef = useRef(0);
  const add = useCallback((x: number, y: number) => {
    const id = ++idRef.current;
    setKisses((k) => [...k, { id, x, y, rot: -18 + Math.random() * 36 }]);
    window.setTimeout(() => setKisses((k) => k.filter((i) => i.id !== id)), 1600);
  }, []);
  return { kisses, add };
}

export function KissLayer({ kisses }: { kisses: Kiss[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {kisses.map((k) => (
        <div key={k.id} className="absolute" style={{ left: k.x, top: k.y }}>
          <motion.div
            initial={{ scale: 0.3, opacity: 0, rotate: k.rot }}
            animate={{ scale: 1, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, times: [0, 0.15, 0.6, 1] }}
            className="-translate-x-1/2 -translate-y-1/2"
          >
            <svg viewBox="0 0 64 44" className="h-9 w-12">
              <path
                d="M32 12c4-9 14-12 20-6 6 6 2 16-6 22-6 4-11 8-14 12-3-4-8-8-14-12C10 22 6 12 12 6c6-6 16-3 20 6Z"
                fill="var(--wine)"
                opacity="0.85"
              />
              <path d="M32 12c0 10 0 20 0 28" stroke="var(--blush)" strokeWidth="1.4" opacity="0.6" />
            </svg>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: -46 }}
            transition={{ duration: 1.5 }}
            className="absolute left-6 top-0 font-script text-2xl text-wine"
          >
            mwah.
          </motion.span>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
              animate={{
                opacity: 0,
                x: Math.cos((i / 6) * Math.PI * 2) * 60,
                y: Math.sin((i / 6) * Math.PI * 2) * 60,
                scale: 1.1,
              }}
              transition={{ duration: 1 }}
              className="absolute text-sm"
            >
              💗
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Photo with fallback ---------------- */

export function SafeImage({
  src,
  alt,
  className = "",
  monogram = "M",
}: {
  src?: string | undefined;
  alt: string;
  className?: string;
  monogram?: string;
}) {
  const [failed, setFailed] = useState(!src);
  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-blush via-ivory to-gold/50 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="font-display text-5xl text-wine/70">{monogram}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/* ---------------- Confetti burst ---------------- */

export function Confetti({ active, gentle = false }: { active: boolean; gentle?: boolean }) {
  const reduce = useReducedMotion();
  const [pieces] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      dur: 4 + Math.random() * 4,
      size: 6 + Math.random() * 8,
      color: ["var(--gold)", "var(--blush)", "var(--wine)"][i % 3] as string,
    })),
  );
  if (!active || reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-[2px]"
          style={{ left: `${p.left}%`, top: "-6%", width: p.size, height: p.size * 0.6, background: p.color }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: [1, 1, 0], rotate: 540 }}
          transition={{ duration: gentle ? p.dur + 2 : p.dur, delay: p.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* ---------------- misc hooks ---------------- */

export function useLongPress(onLong: () => void, ms = 700) {
  const timer = useRef<number | null>(null);
  const start = useCallback(() => {
    timer.current = window.setTimeout(onLong, ms);
  }, [onLong, ms]);
  const clear = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  }, []);
  useEffect(() => clear, [clear]);
  return {
    onPointerDown: start,
    onPointerUp: clear,
    onPointerLeave: clear,
    onPointerCancel: clear,
  };
}
