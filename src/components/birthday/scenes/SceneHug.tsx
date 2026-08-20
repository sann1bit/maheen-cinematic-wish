import { AnimatePresence, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Scene, Particles, Sticker, CuteButton } from "../shared";
import { HUG_MESSAGE, HER_NAME, MY_NAME } from "@/content";

function Bear({ color, blushColor, label }: { color: string; blushColor: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 64 64" className="h-20 w-20 drop-shadow-md sm:h-24 sm:w-24">
        <circle cx="17" cy="15" r="8.5" fill={color} />
        <circle cx="47" cy="15" r="8.5" fill={color} />
        <circle cx="17" cy="15" r="4" fill={blushColor} />
        <circle cx="47" cy="15" r="4" fill={blushColor} />
        <circle cx="32" cy="35" r="21" fill={color} />
        <ellipse cx="32" cy="41" rx="11" ry="9" fill={blushColor} />
        <circle cx="25" cy="31" r="2.6" fill="#241522" />
        <circle cx="39" cy="31" r="2.6" fill="#241522" />
        <circle cx="32" cy="38" r="2.3" fill="#241522" />
        <path d="M32 40c0 3-3 4-5 2.6M32 40c0 3 3 4 5 2.6" stroke="#241522" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="19" cy="36" r="3" fill={blushColor} opacity="0.8" />
        <circle cx="45" cy="36" r="3" fill={blushColor} opacity="0.8" />
      </svg>
      <span className="mt-2 text-xs tracking-wide text-espresso/60">{label}</span>
    </div>
  );
}

export default function SceneHug({ onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion();
  const [hugged, setHugged] = useState(false);
  const x = useMotionValue(0);
  const areaRef = useRef<HTMLDivElement>(null);
  const first = HER_NAME.split(" ")[0] ?? HER_NAME;

  const complete = () => setHugged(true);

  return (
    <Scene>
      <Particles count={10} />
      <Sticker name="ribbon" className="left-6 top-14 h-9 w-9" />
      <Sticker name="star" className="right-7 top-24 h-6 w-6" delay={0.4} />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <h2 className="font-display text-3xl text-espresso">Send a Hug</h2>
        <p className="mt-2 text-sm text-espresso/60">
          Drag {MY_NAME}'s bear to {first}'s — or just press the button.
        </p>

        <div ref={areaRef} className="relative mt-10 h-44 w-full">
          {!hugged ? (
            <>
              <motion.div
                drag={reduce ? false : "x"}
                dragConstraints={areaRef}
                dragElastic={0.12}
                style={{ x }}
                whileTap={{ scale: 0.95 }}
                onDragEnd={(_, info) => {
                  const w = areaRef.current?.clientWidth ?? 320;
                  if (info.point.x > 0 && Math.abs(x.get()) > w * 0.3) complete();
                }}
                className="absolute left-2 top-6 cursor-grab active:cursor-grabbing"
              >
                <Bear color="var(--wine)" blushColor="var(--blush)" label={MY_NAME} />
              </motion.div>
              <motion.div
                animate={reduce ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-2 top-6"
              >
                <Bear color="var(--gold)" blushColor="var(--blush)" label={first} />
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 14 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="-mr-6">
                <Bear color="var(--wine)" blushColor="var(--blush)" label={MY_NAME} />
              </div>
              <div className="-ml-6">
                <Bear color="var(--gold)" blushColor="var(--blush)" label={first} />
              </div>
              {!reduce &&
                Array.from({ length: 16 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                    animate={{
                      opacity: 0,
                      x: Math.cos((i / 16) * Math.PI * 2) * (90 + Math.random() * 60),
                      y: Math.sin((i / 16) * Math.PI * 2) * (70 + Math.random() * 50),
                      scale: 1.2,
                      rotate: 180,
                    }}
                    transition={{ duration: 1.4, delay: i * 0.02 }}
                    className="absolute text-lg"
                  >
                    {["💗", "✨", "🐾"][i % 3]}
                  </motion.span>
                ))}
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {hugged && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-8 max-w-sm font-display text-xl leading-snug text-wine"
            >
              {HUG_MESSAGE}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-3">
          {!hugged ? (
            <CuteButton onClick={complete}>Send a hug</CuteButton>
          ) : (
            <CuteButton variant="gold" onClick={onNext}>
              Cake time
            </CuteButton>
          )}
        </div>
      </div>
    </Scene>
  );
}
