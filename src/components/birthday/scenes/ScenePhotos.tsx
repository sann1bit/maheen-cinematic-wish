import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Scene, Particles, Sticker, CuteButton, SafeImage, KissLayer, useKisses } from "../shared";
import { HER_PHOTOS, HER_NAME } from "@/content";

export default function ScenePhotos({ onNext }: { onNext: () => void }) {
  const { kisses, add } = useKisses();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const first = HER_NAME.split(" ")[0] ?? HER_NAME;

  const handleTap = (e: React.PointerEvent) => {
    const host = e.currentTarget.closest("section");
    if (!host) return;
    const r = host.getBoundingClientRect();
    add(e.clientX - r.left, e.clientY - r.top);
  };

  const scrollTo = (i: number) => {
    const clamped = Math.max(0, Math.min(HER_PHOTOS.length - 1, i));
    setIndex(clamped);
    const el = trackRef.current?.children[clamped] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <Scene>
      <Particles count={10} />
      <Sticker name="cat" className="left-4 top-12 h-10 w-10" />
      <Sticker name="heart" className="right-5 bottom-28 h-8 w-8" delay={0.5} />
      <KissLayer kisses={kisses} />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        <h2 className="font-display text-3xl text-espresso">Proof You're Real</h2>
        <p className="mt-2 text-sm text-espresso/60">Tap any photo. Yes, that's a kiss.</p>

        <div
          ref={trackRef}
          className="mt-7 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={(e) => {
            const el = e.currentTarget;
            const i = Math.round(el.scrollLeft / (el.clientWidth * 0.72));
            setIndex(Math.max(0, Math.min(HER_PHOTOS.length - 1, i)));
          }}
        >
          {HER_PHOTOS.map((p, i) => (
            <motion.figure
              key={i}
              whileTap={{ scale: 0.96 }}
              onPointerDown={handleTap}
              className="soft-card relative w-[72%] shrink-0 snap-center overflow-hidden bg-cream sm:w-[46%] lg:w-[31%]"
            >
              <div className="relative h-[46vh] w-full overflow-hidden bg-blush/40">
                <img
                  src={p.photo}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl opacity-60"
                />
                <SafeImage
                  src={p.photo}
                  alt={`${first} — ${p.caption}`}
                  className="relative h-full w-full object-contain"
                />
              </div>
              <figcaption className="px-5 py-4 text-sm leading-snug text-espresso/80">
                {p.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-4">
          <CuteButton variant="ghost" onClick={() => scrollTo(index - 1)} aria-label="Previous photo">
            ←
          </CuteButton>
          <span className="text-xs text-espresso/50">
            {index + 1} / {HER_PHOTOS.length}
          </span>
          <CuteButton variant="ghost" onClick={() => scrollTo(index + 1)} aria-label="Next photo">
            →
          </CuteButton>
        </div>

        <div className="mt-6">
          <CuteButton onClick={onNext}>Next</CuteButton>
        </div>
      </div>
    </Scene>
  );
}
