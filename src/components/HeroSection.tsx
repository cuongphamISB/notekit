import { useEffect, useRef, useState, useCallback } from "react";
import { CAROUSEL_SLIDE_URLS } from "@/constants/carouselSlides";
import { cn } from "@/lib/utils";

const slides = [...CAROUSEL_SLIDE_URLS];

const STARS = [
  { src: "/sao xanh lam.png", alt: "sao xanh", top: "6%", left: "90%", w: "clamp(28px,5.2vw,88px)", delay: "0s" },
  { src: "/sao màu hồng.png", alt: "sao hồng", top: "42%", left: "94%", w: "clamp(24px,4.8vw,82px)", delay: "0.35s" },
  { src: "/sao xanh lam.png", alt: "sao xanh 2", top: "58%", left: "68%", w: "clamp(22px,4.2vw,72px)", delay: "1.1s" },
  { src: "/sao vàng.png", alt: "sao vàng", top: "78%", left: "8%", w: "clamp(24px,4.5vw,78px)", delay: "0.65s" },
  { src: "/sao màu hồng.png", alt: "sao hồng 2", top: "88%", left: "48%", w: "clamp(22px,4vw,68px)", delay: "0.95s" },
  { src: "/sao xanh lam.png", alt: "sao xanh 3", top: "28%", left: "4%", w: "clamp(20px,3.8vw,64px)", delay: "1.5s" },
] as const;

const MARGIN_STARS = [
  { src: "/sao xanh lam.png", top: "14%", left: "0.8vw", w: "clamp(24px,4.8vw,62px)", delay: "0s" },
  { src: "/sao vàng.png", top: "52%", left: "2.2vw", w: "clamp(22px,4.2vw,58px)", delay: "0.45s" },
  { src: "/sao màu hồng.png", top: "82%", left: "1vw", w: "clamp(20px,3.8vw,54px)", delay: "0.85s" },
  { src: "/sao xanh lam.png", top: "36%", left: "4.5vw", w: "clamp(18px,3.4vw,48px)", delay: "1.2s" },
] as const;

const POST_CTA_DECO = [
  { src: "/sao vàng.png", w: "clamp(28px,3.6vw,48px)", delay: "0s" },
  { src: "/sao màu hồng.png", w: "clamp(26px,3.2vw,44px)", delay: "0.2s" },
  { src: "/sao xanh lam.png", w: "clamp(24px,3vw,40px)", delay: "0.5s" },
] as const;

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [manualMode, setManualMode] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const manualRef = useRef(false);
  manualRef.current = manualMode;

  const stopAutoPlay = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      if (manualRef.current) return;
      setCurrent((p) => (p + 1) % slides.length);
    }, 3000);
  }, [stopAutoPlay]);

  useEffect(() => {
    if (manualMode) {
      stopAutoPlay();
      return;
    }
    startAutoPlay();
    return () => stopAutoPlay();
  }, [manualMode, startAutoPlay, stopAutoPlay]);

  const enterManual = useCallback(() => {
    if (!manualRef.current) {
      manualRef.current = true;
      setManualMode(true);
    }
    stopAutoPlay();
  }, [stopAutoPlay]);

  const goPrev = useCallback(() => {
    enterManual();
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, [enterManual]);

  const goNext = useCallback(() => {
    enterManual();
    setCurrent((p) => (p + 1) % slides.length);
  }, [enterManual]);

  const goTo = useCallback(
    (idx: number) => {
      enterManual();
      setCurrent(idx);
    },
    [enterManual]
  );

  return (
    <section className="relative w-full">

      {MARGIN_STARS.map((s, i) => (
        <div
          key={`m-${i}`}
          className="sticker-slot hero-star hero-star-margin"
          style={{ top: s.top, left: s.left, width: s.w, animationDelay: s.delay }}
        >
          <img src={s.src} alt="" aria-hidden className="h-auto w-full object-contain" />
        </div>
      ))}

      {STARS.map((s, i) => (
        <div
          key={i}
          className="sticker-slot hero-star"
          style={{ top: s.top, left: s.left, width: s.w, animationDelay: s.delay }}
        >
          <img src={s.src} alt={s.alt} className="h-auto w-full object-contain" />
        </div>
      ))}

      <div className="relative z-20 w-full hero-content-wrapper">

        <div className="hero-sticker-desktop">
          <img
            src="/sticker nhân vật.png"
            alt="Character sticker"
            className="h-auto w-full object-contain"
            style={{ filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.12))" }}
          />
        </div>

        <div className="hero-grid">

          <div className="hero-left-col flex flex-col">
            <img
              src="/slogan.png"
              alt="NOTE RA LÀ RÕ"
              className="hero-slogan relative z-[35] h-auto object-contain"
              draggable={false}
            />
            <img
              src="/mô tả sổ.png"
              alt="Mô tả sổ"
              className="hero-desc relative z-[35] h-auto object-contain"
              draggable={false}
            />
            <div className="hero-cta-row relative z-[35] w-full flex flex-col items-center md:items-start max-md:mx-auto">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" })
                }
                className="hero-cta-btn cursor-pointer bg-transparent p-0 transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <span className="hero-cta-anim inline-block">
                  <img
                    src="/CTA button.png"
                    alt="Tạo nên cuốn sổ của riêng bạn"
                    className="hero-cta hero-cta-scale-mobile h-auto object-contain"
                    draggable={false}
                  />
                </span>
              </button>
              <div className="hero-post-cta-deco mt-3 hidden w-full md:flex md:max-w-3xl md:items-end md:justify-between md:gap-8 md:pl-0 md:pr-1 lg:gap-16">
                {POST_CTA_DECO.map((d, i) => (
                  <div
                    key={`d-${i}`}
                    className="pointer-events-none shrink-0"
                    style={{ width: d.w, animationDelay: d.delay }}
                  >
                    <img src={d.src} alt="" aria-hidden className="h-auto w-full object-contain opacity-90" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-carousel-col">
            <div className="relative">
              <div className="hero-sticker-mobile">
                <img
                  src="/sticker nhân vật.png"
                  alt="Character sticker"
                  className="h-auto w-full object-contain"
                  style={{ filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.12))" }}
                />
              </div>

              <button
                type="button"
                aria-label="Ảnh trước"
                onClick={(e) => {
                  e.preventDefault();
                  goPrev();
                }}
                className="hero-arrow hero-arrow-left"
              >
                ◀
              </button>

              <div
                className="relative w-full"
                style={{ aspectRatio: "1 / 1", pointerEvents: "none" }}
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl border-[3px] border-[#0a1560] bg-white">
                  {slides.map((src, i) => (
                    <img
                      key={`bg-${i}`}
                      src={src}
                      alt=""
                      aria-hidden
                      decoding="async"
                      loading="eager"
                      fetchPriority={i === current ? "high" : "low"}
                      className={cn(
                        "absolute inset-0 h-full w-full scale-110 object-cover transition-opacity duration-300 ease-out pointer-events-none select-none",
                        i === current ? "z-[2] opacity-65" : "z-0 opacity-0"
                      )}
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
                    decoding="async"
                    loading="eager"
                    fetchPriority={i === current ? "high" : "low"}
                    aria-hidden={i !== current}
                    className={cn(
                      "hero-slide-fg absolute inset-0 h-full w-full object-contain transition-all duration-300 ease-out pointer-events-none",
                      i === current
                        ? "z-20 opacity-100"
                        : "z-0 opacity-0"
                    )}
                    style={{
                      filter: "drop-shadow(4px 8px 18px rgba(10,21,96,0.28))",
                      padding: "4%",
                    }}
                    draggable={false}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Ảnh tiếp theo"
                onClick={(e) => {
                  e.preventDefault();
                  goNext();
                }}
                className="hero-arrow hero-arrow-right"
              >
                ▶
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
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
