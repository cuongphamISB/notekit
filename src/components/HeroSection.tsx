import { useEffect, useRef, useState } from "react";

const slides = [
  "/mkt (ko nhãn)_result.webp",
  "/fin (ko nhãn)_result.webp",
  "/ibu (ko nhãn)_result.webp",
  "/accounting (ko nhãn)_result.webp",
  "/man (ko nhãn)_result.webp",
];

/**
 * SPATIAL RULES (locked to background.png at background-size: 100% auto):
 *
 *  Red margin line  ≈ 18vw from left viewport edge.
 *    • Left of 18vw: Logo (header) + Character sticker only.
 *    • Right of 18vw: ALL main content (slogan, desc, CTA, carousel).
 *
 *  Character sticker: positioned at ~2vw left, vertically centred with the
 *  carousel (right column). May slightly overlap the red line but not exceed
 *  the content area.
 *
 *  Stars: scattered around the right-zone content, density matching mockup.
 *  Each star uses a different float animation (a/b/c) for natural randomness.
 */

/** Stars calibrated to home.png mockup positions (left values include 18vw offset) */
const STARS = [
  // Upper-left of content zone (just right of margin, near slogan top)
  { src: "/sao xanh lam.png",  alt: "Ngôi sao xanh",       top: "14%", left: "20%",  w: "clamp(20px,2.4vw,42px)", delay: "0s",   anim: "animate-float-a" },
  // Upper area above carousel
  { src: "/sao vàng.png",      alt: "Ngôi sao vàng",        top: "10%", left: "58%",  w: "clamp(24px,2.8vw,48px)", delay: "0.7s", anim: "animate-float-b" },
  // Mid — between left column and carousel
  { src: "/sao màu hồng.png",  alt: "Ngôi sao hồng",        top: "58%", left: "46%",  w: "clamp(18px,2.1vw,36px)", delay: "0.3s", anim: "animate-float-c" },
  // Below slogan, near description
  { src: "/sao xanh lam.png",  alt: "Ngôi sao xanh nhỏ",    top: "33%", left: "22%",  w: "clamp(12px,1.4vw,24px)", delay: "1.5s", anim: "animate-float-b" },
  // Near CTA button
  { src: "/sao vàng.png",      alt: "Ngôi sao vàng nhỏ",    top: "72%", left: "29%",  w: "clamp(14px,1.7vw,28px)", delay: "1.2s", anim: "animate-float-a" },
  // Right side, below carousel
  { src: "/sao màu hồng.png",  alt: "Ngôi sao hồng nhỏ",    top: "80%", left: "54%",  w: "clamp(16px,1.9vw,30px)", delay: "0.9s", anim: "animate-float-c" },
  // Extra — top right corner area
  { src: "/sao xanh lam.png",  alt: "Ngôi sao xanh góc phải",top:"8%",  left: "72%",  w: "clamp(14px,1.6vw,26px)", delay: "1.8s", anim: "animate-float-a" },
] as const;

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      3000
    );
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goPrev = () => {
    resetTimer();
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  };
  const goNext = () => {
    resetTimer();
    setCurrent((p) => (p + 1) % slides.length);
  };

  return (
    <section className="relative w-full min-h-screen">

      {/* ══════════════════════════════════════════════
          CHARACTER STICKER — left of the red margin
          Vertically centred with the carousel column.
          left: 2vw keeps it in the logo/left-margin zone.
          ══════════════════════════════════════════════ */}
      <div
        className="sticker-slot hidden lg:block animate-float-gentle"
        style={{
          top: "38%",
          left: "2vw",
          width: "clamp(80px, 8.5vw, 144px)",
          animationDelay: "0s",
        }}
      >
        <img
          src="/sticker nhân vật.png"
          alt="Character sticker"
          className="h-auto w-full object-contain"
        />
      </div>

      {/* ══════════════════════════════════════════════
          DECORATIVE STARS — scattered in content zone
          ══════════════════════════════════════════════ */}
      {STARS.map((s, i) => (
        <div
          key={i}
          className={`sticker-slot hidden md:block ${s.anim}`}
          style={{
            top: s.top,
            left: s.left,
            width: s.w,
            animationDelay: s.delay,
          }}
        >
          <img src={s.src} alt={s.alt} className="h-auto w-full object-contain" />
        </div>
      ))}

      {/* ══════════════════════════════════════════════
          MAIN HERO CONTENT
          Starts at 18vw (right of the red margin line).
          Uses fluid vw-based spacing so proportions are
          locked to background.png at every viewport width.
          ══════════════════════════════════════════════ */}
      <div
        className="relative z-20 flex min-h-screen w-full items-center"
        style={{
          paddingTop:    "clamp(64px, 6.2vw, 110px)",   /* clears the header */
          paddingBottom: "clamp(24px, 3vw,   56px)",
          paddingLeft:   "18vw",                          /* right of red margin */
          paddingRight:  "clamp(16px, 2.5vw, 48px)",
        }}
      >
        {/*
         * Two-column grid:
         *   Left  — slogan + description + CTA (flexible)
         *   Right — carousel (fixed fluid width)
         */}
        <div
          className="w-full grid items-center"
          style={{
            gridTemplateColumns: "1fr clamp(240px, 30vw, 430px)",
            gap: "clamp(20px, 3vw, 56px)",
          }}
        >

          {/* ── Left column: Slogan ➔ Description ➔ CTA ── */}
          <div
            className="flex flex-col items-start"
            style={{ gap: "clamp(14px, 1.8vw, 32px)" }}
          >
            <img
              src="/slogan.png"
              alt="NOTE RA LÀ RÕ"
              className="h-auto object-contain"
              style={{ width: "min(100%, clamp(260px, 38vw, 560px))" }}
              draggable={false}
            />

            <img
              src="/mô tả sổ.png"
              alt="Mô tả sổ"
              className="h-auto object-contain"
              style={{ width: "min(100%, clamp(210px, 30vw, 440px))" }}
              draggable={false}
            />

            {/* CTA — especially prominent per spec */}
            <button
              type="button"
              onClick={() =>
                document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" })
              }
              className="cursor-pointer bg-transparent p-0 transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <img
                src="/CTA button.png"
                alt="Tạo nên cuốn sổ của riêng bạn"
                className="h-auto object-contain"
                style={{ width: "clamp(220px, 32vw, 460px)" }}
                draggable={false}
              />
            </button>
          </div>

          {/* ── Right column: Carousel ── */}
          <div className="relative flex-shrink-0">

            {/* ── Arrow: previous ── */}
            <button
              type="button"
              aria-label="Ảnh trước"
              onClick={goPrev}
              className="absolute -left-5 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a1560] text-white shadow-[2px_2px_8px_rgba(0,0,0,0.18)] transition-transform hover:scale-110"
            >
              <span aria-hidden className="text-sm leading-none select-none">◀</span>
            </button>

            {/* ══════════════════════════════════════════
                CAROUSEL FRAME
                Near-square aspect ratio (matches mockup).
                Inner clip holds blurred backdrop.
                Sharp image renders outside clip so its
                drop-shadow is fully visible (3D lift effect).
                ══════════════════════════════════════════ */}
            <div
              className="relative w-full"
              style={{ aspectRatio: "1 / 1" }}
            >
              {/* Inner container: clips blurred backdrops + carries the border */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl border-[3px] border-[#0a1560] bg-white">
                {slides.map((src, i) => (
                  <img
                    key={`bg-${i}`}
                    src={src}
                    alt=""
                    aria-hidden
                    className={`absolute inset-0 h-full w-full object-cover scale-110 transition-opacity duration-700 pointer-events-none select-none ${
                      i === current ? "opacity-65" : "opacity-0"
                    }`}
                    style={{ filter: "blur(22px)" }}
                    draggable={false}
                  />
                ))}
              </div>

              {/* Sharp notebook images — sit above inner clip, drop-shadow visible */}
              {slides.map((src, i) => (
                <img
                  key={`fg-${i}`}
                  src={src}
                  alt={`Notebook preview ${i + 1}`}
                  className={`absolute inset-0 z-10 h-full w-full object-contain transition-all duration-700 ease-in-out ${
                    i === current ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
                  }`}
                  style={{
                    filter: "drop-shadow(4px 8px 18px rgba(10,21,96,0.28))",
                    padding: "4%",       /* slight inset so drop-shadow is fully visible */
                  }}
                  draggable={false}
                />
              ))}
            </div>

            {/* ── Arrow: next ── */}
            <button
              type="button"
              aria-label="Ảnh tiếp theo"
              onClick={goNext}
              className="absolute -right-5 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a1560] text-white shadow-[2px_2px_8px_rgba(0,0,0,0.18)] transition-transform hover:scale-110"
            >
              <span aria-hidden className="text-sm leading-none select-none">▶</span>
            </button>

            {/* ── Dot indicators ── */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { resetTimer(); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "h-2.5 w-7 bg-[#0a1560]"
                      : "h-2.5 w-2.5 bg-black/20 hover:bg-black/35"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
