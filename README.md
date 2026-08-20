# Maheen's Cinematic Birthday

LOVABLE PROMPT — Cinematic Birthday Experience for Maheen

Build a premium, mobile-first, single-page interactive birthday website — a 7-scene cinematic story (swipe/scroll navigation, no navbar/footer). This is for a long-distance couple who haven't met in person yet, so keep it warm and personal without relying on in-person moments or a "days together" counter.

Her name: Maheen Batool. His name: Ahsan. Her birthday: August 21st. Use these exact names everywhere a name is needed — no placeholder brackets for these three. In 2–3 emotional lines (not more), use the pet name "jaanemann" instead of the word "girlfriend" — e.g. "Happy birthday, jaanemann" — never generic Hallmark phrasing like "best girlfriend ever."

Design System (keep this exact feel — reuse everywhere)

Colors: ivory #FAF3EC (base bg), blush #F1D8DC (soft accent), midnight plum #241522 (dark scenes), wine #7C2D3F (primary accent), gold #C9A66B (dividers/particles), espresso #372430 (text on light), cream #F7ECE4 (text on dark).

Push the tone toward cute while staying premium: soft rounded shapes, generous whitespace, gentle drop shadows — think "elegant but adorable," not flat clipart.

Cute sticker accents throughout: small illustrated doodles — a teddy bear, a cat, a heart, a star, a little ribbon — recolored to match the palette above, scattered subtly in scene corners/margins (never covering text, never more than 2–3 per scene).

Type: elegant serif for headlines (e.g. Fraunces/Cormorant Garamond), clean rounded sans for body (e.g. Manrope/Quicksand-ish warmth).

Motion: scene-to-scene transitions stay smooth and soft (crossfade + slight drift) — but individual interactive elements (buttons, stickers, cards) get a playful bounce/squish easing on tap, so the experience feels alive and cute without becoming chaotic.

Subtle floating particles: soft petals, sparkle dust, tiny heart shapes drifting slowly in the background.

Faint paper-grain texture on backgrounds for a tactile feel.

Global Behavior

7 full-viewport scenes, scroll-snap + swipe on mobile, click/arrow-keys on desktop.

Thin progress dots (fixed, subtle) showing scene position.

Music toggle (bottom corner icon): starts muted, tap to unmute.

Every scene has an obvious way forward.

prefers-reduced-motion → simple fades instead of heavy/bouncy animation.

Missing photo → graceful gradient+monogram fallback, never a broken image icon.

Centralized Personalization File

One content file (content.ts) holding every input, wired into its scene:

HER_NAME = "Maheen Batool"
MY_NAME = "Ahsan"
DATE = "August 21st"

SPECIAL_MESSAGE
APPRECIATION_MESSAGE
SECRET_MESSAGE
HUG_MESSAGE

HER_PHOTOS: [{ photo, caption }, ...]   // her solo photos, expandable array (5–7)
PHOTO_URLS: { envelope, final }         // optional accent images
SONG_URL


Scenes (write clever, heartfelt, non-cliché copy — no cringe lines)

Loading — midnight bg, gold progress hairline, one line of micro-copy: "gathering stardust for Maheen…"

The Threshold — dark, atmospheric, kinetic text: "Before you go any further — this exists because of exactly one person. It's you, Maheen." Tap to begin.

The Letter — envelope with wax seal, tap to open, letter unfolds with a short warm note ending "— Ahsan, August 21st".

Her Photos ("Proof You're Real") — swipeable/draggable gallery built from HER_PHOTOS, each card showing one of her photos with a short caption compliment. Tapping any photo triggers a soft lipstick-style kiss-mark stamp near the tap point plus a fading "mwah." in the script accent font, with a small warm heart-particle burst.

Send a Hug (long-distance edition) — replaces any "reasons list" concept. Two small, cute illustrated bear characters (recolored to the palette, one representing each of them) sit on opposite sides of the screen. Drag one bear across the screen (or tap a "send a hug" button) to bring them together in the middle — on contact they hug, with a burst of hearts, tiny stars, and paw-print confetti. Reveal HUG_MESSAGE beneath, e.g. "not the real thing, but it'll have to do for now." This should feel like the cutest, most delightful interaction on the site.

Cake Time — midnight bg, illustrated cake with a lit candle, press-and-hold to blow it out, gentle confetti burst, "make a wish." Centerpiece interaction — the most alive and satisfying moment on the site, alongside Scene 5.

Finale — restrained gold/blush confetti plus a few of the cute stickers drifting down with it, APPRECIATION_MESSAGE leading into "Happy birthday, jaanemann." + signature "Ahsan, August 21st", replay button. Tapping her name here triggers the same kiss-mark + "mwah." effect from Scene 4. Hidden easter egg: long-press a small corner heart icon reveals SECRET_MESSAGE.

Technical Requirements

React + TypeScript + Tailwind + Framer Motion. Scene-index-driven single page, componentized (one component per scene + shared transition wrapper). Colors/spacing/fonts as design tokens. Lazy-load images, graceful fallbacks. Accessible: focus states, 44px+ tap targets, alt text, keyboard nav, reduced-motion support. No navbar/footer/default chrome. Production-quality, no console errors, no layout shift.

Before shipping

Every field in the content file is visibly wired into a scene. The photo gallery, the bear hug, and the cake/candle moment are the emotional and cute centerpieces — make sure all three feel the most polished and delightful of all 7 scenes. ( i attached all the pictures of her to u )

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://maheen-cinematic-wish.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b8bec7ac-26c9-4e82-ae0c-63edb25e8352).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
