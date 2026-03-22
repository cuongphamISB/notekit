import { useEffect, useRef, useState } from "react";

const slides = [
  "/mkt (ko nhãn)_result.webp",
  "/fin (ko nhãn)_result.webp",
  "/ibu (ko nhãn)_result.webp",
  "/accounting (ko nhãn)_result.webp",
  "/man (ko nhãn)_result.webp",
];

/**
 * Sticker/star positions are calibrated against the mockup:
 *   – Blue cross-star  : upper-left of content, just right of the margin line
 *   – Yellow star      : upper area above the carousel (right column)
 *   – Pink cross-star  : mid-section between the two columns
 *   – Character sticker: left margin zone, vertically centred in the hero
 */
const STICKERS = [
  {
    src: "/sticker nhân vật.png",
    alt: "Character sticker",
    animation: "animate-float-gentle",
    style: { top: "36%", left: "2%", width: "clamp(88px, 9vw, 148px)" },
    delay: "0s",
  },
  {
    src: "/sao xanh lam.png",
    alt: "Blue star",
    animation: "animate-float-gentle",
    style: { top: "22%", left: "21%", width: "clamp(18px, 2.2vw, 38px)" },
    delay: "0.4s",
  },
  {
    src: "/sao vàng.png",
    alt: "Yellow star",
    animation: "animate-float-gentle",
    style: { top: "13%", left: "57%", width: "clamp(20px, 2.4vw, 42px)" },
    delay: "0.8s",
  },
  {
    src: "/sao màu hồng.png",
    alt: "Pink star",
    animation: "animate-bounce",
    style: { top: "56%", left: "45%", width: "clamp(16px, 2vw, 34px)" },
    delay: "0.3s",
  },
] as const;

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  /* Auto-advance every 3 s */
  useEffect(() => {
    intervalRef.current = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      3000
    );
    return () => clearInterval(intervalRef.current);
  }, []);

  /* Scroll tracking for parallax / mask */
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const contentTranslate = Math.min(scrollY * 0.35, 260);
  const contentOpacity   = Math.max(1 - scrollY / 500, 0);
  const maskProgress     = Math.min(scrollY / 320, 1);

  const goPrev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((p) => (p + 1) % slides.length);

  /* Mask panels replicate body background so content "slides behind" the page edges */
  const maskPanel = (dir: "bottom" | "top") => ({
    backgroundImage: `url('/background.png'), linear-gradient(to ${dir}, var(--bg-fallback, #eef4f8) 55%, transparent)`,
    backgroundSize: "cover, 100% 100%",
    backgroundPosition: "center top, 0 0",
    backgroundAttachment: "fixed, scroll",
    backgroundRepeat: "no-repeat, no-repeat",
  });

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* ── Scroll Mask: covers top + bottom as user scrolls ── */}
      <div className="pointer-events-none fixed inset-0 z-40">
        <div
          className="absolute left-0 right-0 top-0"
          style={{ height: `${maskProgress * 28}vh`, ...maskPanel("bottom") }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: `${maskProgress * 26}vh`, ...maskPanel("top") }}
        />
      </div>

      {/* ── Decorative stickers & stars (absolute, hidden on mobile) ── */}
      {STICKERS.map((s, i) => (
        <div
          key={i}
          className={`sticker-slot hidden md:block ${s.animation}`}
          style={{ ...s.style, animationDelay: s.delay }}
        >
          <img src={s.src} alt={s.alt} className="h-auto w-full object-contain" />
        </div>
      ))}

      {/* ── Main hero content ── */}
      <div
        className="relative z-20 mx-auto max-w-[1440px] pb-20 pl-[20%] pr-4 pt-[100px] md:pr-8 md:pt-[112px] lg:pr-12"
        style={{
          transform: `translateY(${contentTranslate}px)`,
          opacity: contentOpacity,
          willChange: "transform, opacity",
        }}
      >
        <div className="grid min-h-[calc(100vh-120px)] items-center gap-8 lg:grid-cols-2 lg:gap-12">

          {/* ── Left column: Slogan → Description → CTA ── */}
          <div className="flex flex-col items-start gap-5 md:gap-7">
            <img
              src="/slogan.png"
              alt="NOTE RA LÀ RÕ"
              className="h-auto w-full max-w-[500px] shrink-0 object-contain"
              draggable={false}
            />

            <img
              src="/mô tả sổ.png"
              alt="Mô tả sổ"
              className="h-auto w-full max-w-[420px] object-contain"
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
                className="h-[62px] w-auto object-contain md:h-[70px]"
                draggable={false}
              />
            </button>
          </div>

          {/* ── Right column: Carousel ── */}
          <div className="flex items-center justify-center lg:justify-end">
            {/* Outer wrapper: holds the frame + both arrow buttons */}
            <div className="relative w-full max-w-[400px]">

              {/* Left arrow */}
              <button
                type="button"
                aria-label="Ảnh trước"
                onClick={goPrev}
                className="absolute -left-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a1560] text-white shadow-[2px_2px_8px_rgba(0,0,0,0.18)] transition-transform hover:scale-110"
              >
                <span aria-hidden className="text-sm leading-none">◀</span>
              </button>

              {/* Carousel frame — solid border, NO dashed scrapbook-box */}
              <div className="carousel-frame aspect-[3/4] w-full bg-white shadow-[0_4px_24px_rgba(10,21,96,0.12)]">
                {slides.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Notebook preview ${i + 1}`}
                    className={`absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-in-out ${
                      i === current ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
                    }`}
                    draggable={false}
                  />
                ))}
              </div>

              {/* Right arrow */}
              <button
                type="button"
                aria-label="Ảnh tiếp theo"
                onClick={goNext}
                className="absolute -right-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a1560] text-white shadow-[2px_2px_8px_rgba(0,0,0,0.18)] transition-transform hover:scale-110"
              >
                <span aria-hidden className="text-sm leading-none">▶</span>
              </button>

              {/* Dot indicators */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setCurrent(i)}
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
      </div>
    </section>
  );
};

export default HeroSection;
