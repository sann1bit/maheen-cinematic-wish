import { motion } from "framer-motion";
import { useEffect } from "react";
import { Scene, Particles, Sticker } from "../shared";
import { HER_NAME } from "@/content";

export default function SceneLoading({ onDone }: { onDone: () => void }) {
  const first = HER_NAME.split(" ")[0] ?? HER_NAME;
  useEffect(() => {
    const t = window.setTimeout(onDone, 2600);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <Scene dark>
      <Particles tone="dark" count={12} />
      <Sticker name="star" className="left-8 top-16 h-8 w-8" />
      <Sticker name="star" className="right-10 top-28 h-5 w-5" delay={0.4} />
      <div className="relative z-10 w-full max-w-xs text-center">
        <div className="h-px w-full overflow-hidden bg-cream/15">
          <motion.div
            className="h-full bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5 text-xs tracking-[0.3em] text-cream/70 uppercase"
        >
          gathering stardust for {first}…
        </motion.p>
      </div>
    </Scene>
  );
}
