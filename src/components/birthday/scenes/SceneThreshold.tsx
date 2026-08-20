import { motion, useReducedMotion } from "framer-motion";
import { Scene, Particles, Sticker, CuteButton } from "../shared";
import { HER_NAME } from "@/content";

const LINES = [
  "Before you go any further —",
  "this exists because of exactly one person.",
];

export default function SceneThreshold({ onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion();
  const first = HER_NAME.split(" ")[0] ?? HER_NAME;
  return (
    <Scene dark>
      <Particles tone="dark" count={14} />
      <Sticker name="heart" className="left-6 bottom-24 h-9 w-9" />
      <Sticker name="ribbon" className="right-7 top-20 h-10 w-10" delay={0.5} />
      <div className="relative z-10 max-w-md text-center">
        {LINES.map((line, i) => (
          <motion.p
            key={line}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.2 + i * 0.5, duration: 0.8 }}
            className="font-display text-2xl leading-snug text-cream/85 sm:text-3xl"
          >
            {line}
          </motion.p>
        ))}
        <motion.h1
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-4xl text-gold sm:text-5xl"
        >
          It's you, {first}.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-10"
        >
          <CuteButton variant="gold" onClick={onNext}>
            Tap to begin
          </CuteButton>
        </motion.div>
      </div>
    </Scene>
  );
}
