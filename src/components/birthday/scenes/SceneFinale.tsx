import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Scene,
  Particles,
  Sticker,
  CuteButton,
  Confetti,
  KissLayer,
  useKisses,
  useLongPress,
  SafeImage,
} from "../shared";
import { APPRECIATION_MESSAGE, SECRET_MESSAGE, HER_NAME, MY_NAME, DATE, PHOTO_URLS } from "@/content";

export default function SceneFinale({ onReplay }: { onReplay: () => void }) {
  const { kisses, add } = useKisses();
  const [secret, setSecret] = useState(false);
  const longPress = useLongPress(() => setSecret(true), 800);
  const first = HER_NAME.split(" ")[0] ?? HER_NAME;

  const kissAt = (e: React.PointerEvent) => {
    const host = e.currentTarget.closest("section");
    if (!host) return;
    const r = host.getBoundingClientRect();
    add(e.clientX - r.left, e.clientY - r.top);
  };

  return (
    <Scene>
      <Confetti active gentle />
      <Particles count={12} />
      <Sticker name="teddy" className="left-4 top-12 h-11 w-11" />
      <Sticker name="ribbon" className="right-5 top-24 h-9 w-9" delay={0.4} />
      <Sticker name="star" className="left-10 bottom-20 h-6 w-6" delay={0.8} />
      <KissLayer kisses={kisses} />

      <div className="relative z-10 w-full max-w-md text-center">
        <SafeImage
          src={PHOTO_URLS.final}
          alt={`${first} smiling`}
          className="soft-card mx-auto h-32 w-32 rounded-full object-cover"
          monogram="M"
        />
        <p className="mt-7 text-sm leading-relaxed text-espresso/75">{APPRECIATION_MESSAGE}</p>
        <h2 className="mt-6 font-display text-3xl leading-tight text-wine">
          Happy birthday,{" "}
          <motion.button
            type="button"
            onPointerDown={kissAt}
            whileTap={{ scale: 0.92 }}
            className="font-script text-4xl text-wine underline decoration-gold/60 underline-offset-4"
            aria-label={`Kiss for ${HER_NAME}`}
          >
            jaanemann
          </motion.button>
          .
        </h2>
        <p className="mt-4 font-script text-2xl text-espresso/80">
          {MY_NAME}, {DATE}
        </p>

        <div className="mt-9 flex items-center justify-center gap-4">
          <CuteButton variant="ghost" onClick={onReplay}>
            Replay
          </CuteButton>
          <motion.button
            type="button"
            {...longPress}
            whileTap={{ scale: 0.85 }}
            aria-label="A little secret — press and hold"
            className="flex h-12 w-12 items-center justify-center rounded-full text-wine/50"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path
                d="M12 21S3 14 3 8.5C3 5.5 5.4 3 8.4 3c1.6 0 3 .8 3.6 2 .6-1.2 2-2 3.6-2C18.6 3 21 5.5 21 8.5 21 14 12 21 12 21Z"
                fill="currentColor"
              />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {secret && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-2xl bg-blush/60 px-5 py-4 text-sm leading-relaxed text-espresso"
            >
              {SECRET_MESSAGE}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  );
}
