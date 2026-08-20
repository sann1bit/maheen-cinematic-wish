import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Scene, Particles, Sticker, CuteButton } from "../shared";
import { LETTER_MESSAGE, SPECIAL_MESSAGE, MY_NAME, DATE } from "@/content";

export default function SceneLetter({ onNext }: { onNext: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Scene>
      <Particles count={10} />
      <Sticker name="teddy" className="left-5 top-16 h-12 w-12" />
      <Sticker name="star" className="right-8 bottom-24 h-7 w-7" delay={0.6} />

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div
              key="envelope"
              exit={{ opacity: 0, scale: 0.94 }}
              className="flex flex-col items-center"
            >
              <motion.button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open the letter"
                whileTap={{ scale: 0.94, rotate: -1 }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="soft-card relative h-52 w-full max-w-sm overflow-hidden bg-blush"
              >
                <div className="absolute inset-x-0 top-0 h-1/2 origin-top border-b border-wine/15 bg-blush [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-wine font-display text-xl text-cream shadow-lg">
                  M
                </span>
              </motion.button>
              <p className="mt-6 text-sm text-espresso/60">Tap the seal to open it</p>
            </motion.div>
          ) : (
            <motion.article
              key="letter"
              initial={{ opacity: 0, rotateX: -70, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="soft-card bg-cream px-7 py-9 text-left"
            >
              <p className="font-display text-lg leading-relaxed text-espresso">{LETTER_MESSAGE}</p>
              <p className="mt-4 text-sm leading-relaxed text-espresso/75">{SPECIAL_MESSAGE}</p>
              <p className="mt-6 font-script text-2xl text-wine">
                — {MY_NAME}, {DATE}
              </p>
              <div className="mt-7 flex justify-center">
                <CuteButton onClick={onNext}>Keep going</CuteButton>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  );
}
