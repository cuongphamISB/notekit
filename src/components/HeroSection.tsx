import { useEffect, useRef, useState } from "react";

const slides = [
  "/mkt (ko nhãn)_result.webp",
  "/fin (ko nhãn)_result.webp",
  "/ibu (ko nhãn)_result.webp",
  "/accounting (ko nhãn)_result.webp",
  "/man (ko nhãn)_result.webp",
];

/**
 * SPATIAL RULES (calibrated to background.png redrawn as CSS, and home.png mockup):
 *
 *  Red margin line  ≈ 13 vw from left viewport edge.
 *    • Left  of 13 vw : Logo (header) + Character sticker only.
 *    • Right of 13 vw : ALL main content.
 *
 *  Content padding-left = 15 vw  (2 vw gap between line and content).
 *  Carousel column     = clamp(200 px, 38 vw, 750 px)  — large, matching mockup.
 *  Character sticker   = 11 vw wide, left: 1 vw, top-anchored below header.
 *
 *  Responsive:
 *    < 700 px (mobile)  → single column, no vertical centering, sticker hidden.
 *    ≥ 700 px (desktop) → two-column grid via .hero-grid CSS class.
 */

const STARS = [
  { src: "/sao xanh lam.png",  alt: "sao xanh",  top: "13%", left: "20%",  w: "clamp(18px,2.2vw,38px)", delay: "0s",   anim: "animate-float-a" },
  { src: "/sao vàng.png",      alt: "sao vàng",   top: "9%",  left: "57%",  w: "clamp(22px,2.6vw,44px)", delay: "0.7s", anim: "animate-float-b" },
  { src: "/sao màu hồng.png",  alt: "sao hồng",   top: "56%", left: "45%",  w: "clamp(16px,2vw,34px)",   delay: "0.3s", anim: "animate-float-c" },
  { src: "/sao xanh lam.png",  alt: "sao xanh 2", top: "32%", left: "22%",  w: "clamp(10px,1.3vw,22px)", delay: "1.5s", anim: "animate-float-b" },
  { src: "/sao vàng.png",      alt: "sao vàng 2", top: "70%", left: "28%",  w: "clamp(12px,1.6vw,26px)", delay: "1.2s", anim: "animate-float-a" },
  { src: "/sao màu hồng.png",  alt: "sao hồng 2", top: "79%", left: "53%",  w: "clamp(14px,1.8vw,28px)", delay: "0.9s", anim: "animate-float-c" },
  { src: "/sao xanh lam.png",  alt: "sao xanh 3", top: "7%",  left: "71%",  w: "clamp(12px,1.5vw,24px)", delay: "1.8s", anim: "animate-float-a" },
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

  const goPrev = () => { resetTimer(); setCurrent((p) => (p - 1 + slides.length) % slides.length); };
  const goNext = () => { resetTimer(); setCurrent((p) => (p + 1) % slides.length); };

  return (
    <section className="relative w-full min-h-screen">

      {/* ── CHARACTER STICKER — left of the 13 vw margin line ── */}
      <div
        className="sticker-slot hidden lg:block animate-float-gentle"
        style={{
          top:   "5.5vw",
          left:  "1vw",
          width: "clamp(80px, 11vw, 185px)",
        }}
      >
        <img
          src="/sticker nhân vật.png"
          alt="Character sticker"
          className="h-auto w-full object-contain"
        />
      </div>

      {/* ── DECORATIVE STARS ── */}
      {STARS.map((s, i) => (
        <div
          key={i}
          className={`sticker-slot hidden md:block ${s.anim}`}
          style={{ top: s.top, left: s.left, width: s.w, animationDelay: s.delay }}
        >
          <img src={s.src} alt={s.alt} className="h-auto w-full object-contain" />
        </div>
      ))}

      {/* ── MAIN HERO CONTENT ──────────────────────────────────────────────────
          Content starts at 15 vw (right of the 13 vw margin line + 2 vw gap).
          No flex vertical-centering — content is top-anchored so it fills the
          viewport from the top, matching home.png proportions at every device.
          ──────────────────────────────────────────────────────────────────── */}
      <div
        className="relative z-20 w-full"
        style={{
          paddingTop:    "clamp(50px, 5.5vw, 96px)",  /* clears header */
          paddingBottom: "clamp(40px, 4vw,   80px)",
          paddingLeft:   "15vw",                        /* right of 13 vw margin line */
          paddingRight:  "clamp(16px, 2.5vw, 48px)",
        }}
      >
        {/* .hero-grid: single col on mobile, two cols (1fr + 38vw) on ≥ 700 px */}
        <div className="hero-grid">

          {/* ── Left column: Slogan → Description → CTA ── */}
          <div
            className="flex flex-col items-start"
            style={{ gap: "clamp(12px, 1.6vw, 28px)" }}
          >
            <img
              src="/slogan.png"
              alt="NOTE RA LÀ RÕ"
              className="h-auto object-contain"
              style={{ width: "min(100%, clamp(200px, 42vw, 660px))" }}
              draggable={false}
            />

            <img
              src="/mô tả sổ.png"
              alt="Mô tả sổ"
              className="h-auto object-contain"
              style={{ width: "min(100%, clamp(170px, 33vw, 500px))" }}
              draggable={false}
            />

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
                style={{ width: "clamp(180px, 38vw, 560px)" }}
                draggable={false}
              />
            </button>
          </div>

          {/* ── Right column: Carousel ── */}
          <div className="relative flex-shrink-0">

            <button
              type="button"
              aria-label="Ảnh trước"
              onClick={goPrev}
              className="absolute -left-5 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a1560] text-white shadow-[2px_2px_8px_rgba(0,0,0,0.18)] transition-transform hover:scale-110"
            >
              <span aria-hidden className="text-sm leading-none select-none">◀</span>
            </button>

            {/* Square carousel frame */}
            <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
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

              {slides.map((src, i) => (
                <img
                  key={`fg-${i}`}
                  src={src}
                  alt={`Notebook preview ${i + 1}`}
                  className={`absolute inset-0 z-10 h-full w-full object-contain transition-all duration-700 ease-in-out ${
                    i === current ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
                  }`}
                  style={{
                    filter:  "drop-shadow(4px 8px 18px rgba(10,21,96,0.28))",
                    padding: "4%",
                  }}
                  draggable={false}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Ảnh tiếp theo"
              onClick={goNext}
              className="absolute -right-5 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a1560] text-white shadow-[2px_2px_8px_rgba(0,0,0,0.18)] transition-transform hover:scale-110"
            >
              <span aria-hidden className="text-sm leading-none select-none">▶</span>
            </button>

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
