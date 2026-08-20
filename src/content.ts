import p1 from "@/assets/maheen-1.jpg.asset.json";
import p2 from "@/assets/maheen-2.jpg.asset.json";
import p3 from "@/assets/maheen-3.jpg.asset.json";
import p4 from "@/assets/maheen-4.jpg.asset.json";
import p5 from "@/assets/maheen-5.jpg.asset.json";
import p6 from "@/assets/maheen-6.jpg.asset.json";

export const HER_NAME = "Maheen Batool";
export const MY_NAME = "Ahsan";
export const DATE = "August 21st";

export const SPECIAL_MESSAGE =
  "You arrived in my life the way good news does — unannounced, and suddenly everything after it is easier to carry. I have never held your hand, and still, somehow, you are the steadiest thing I know.";

export const APPRECIATION_MESSAGE =
  "Thank you for the voice notes sent at impossible hours, for laughing at the joke before I finish it, for being patient with a distance neither of us chose. You make waiting feel like a plan instead of a punishment.";

export const SECRET_MESSAGE =
  "You found it. Here's the quiet part: I already know how the story ends — with a door, an airport, and me recognising your laugh before I see your face.";

export const HUG_MESSAGE =
  "Not the real thing, but it'll have to do for now. Hold on to it until I can deliver it in person.";

export const LETTER_MESSAGE =
  "Maheen — I keep trying to write something clever and it keeps coming out honest instead. So: today the world gets to celebrate the person I'd choose on every ordinary Tuesday. I hope this year is generous with you — soft mornings, loud laughter, and every small thing going your way. Save me a seat in all of it.";

export type HerPhoto = { photo: string; caption: string };

export const HER_PHOTOS: HerPhoto[] = [
  { photo: p1.url, caption: "That smile does illegal things to my concentration." },
  { photo: p2.url, caption: "Soft green, softer look — completely unfair." },
  { photo: p3.url, caption: "Chaotic angle, zero flaws. How." },
  { photo: p4.url, caption: "The 'I'm pretending to be annoyed' face. My favourite." },
  { photo: p5.url, caption: "Proof that the phone is lucky, not the other way round." },
  { photo: p6.url, caption: "Caught mid-laugh — this is the one I keep." },
];

export const PHOTO_URLS: { envelope?: string; final?: string } = {
  envelope: p2.url,
  final: p6.url,
};

export const SONG_URL =
  "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=romantic-piano-107155.mp3";
