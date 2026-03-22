import { useEffect, useRef, useState } from "react";

const slides = [
  "/mkt (ko nhãn)_result.webp",
  "/fin (ko nhãn)_result.webp",
  "/ibu (ko nhãn)_result.webp",
  "/accounting (ko nhãn)_result.webp",
  "/man (ko nhãn)_result.webp",
];

const decorativeAssets = [
  {
    src: "/sao xanh lam.png",
    alt: "Sao xanh lam",
    className: "animate-float-gentle",
    style: { top: "20vh", left: "7vw", width: "clamp(24px, 2.6vw, 48px)" },
  },
  {
    src: "/sao vàng.png",
    alt: "Sao vàng",
    className: "animate-float-gentle",
    style: { top: "14vh", left: "56vw", width: "clamp(24px, 2.8vw, 52px)" },
  },
  {
    src: "/sao màu hồng.png",
    alt: "Sao màu hồng",
    className: "animate-bounce",
    style: { top: "49vh", left: "52vw", width: "clamp(22px, 2.4vw, 44px)" },
  },
  {
    src: "/sticker nhân vật.png",
    alt: "Sticker nhân vật",
    className: "animate-float-gentle",
    style: { top: "41vh", left: "2.5vw", width: "clamp(100px, 11vw, 180px)" },
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  // Auto-advance carousel every 3s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Scroll tracking for mask effect
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const contentTranslate = Math.min(scrollY * 0.38, 280);
  const contentOpacity = Math.max(1 - scrollY / 500, 0);
  const maskProgress = Math.min(scrollY / 320, 1);

  const goPrev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="scroll-mask-overlay pointer-events-none fixed inset-0 z-40">
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: `${maskProgress * 28}vh`,
            backgroundImage: `
              linear-gradient(rgba(255,183,178,0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,183,178,0.18) 1px, transparent 1px),
              linear-gradient(to bottom, #eef4f8 60%, transparent)
            `,
            backgroundSize: "10px 10px, 10px 10px, 100% 100%",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: `${maskProgress * 26}vh`,
            backgroundImage: `
              linear-gradient(rgba(255,183,178,0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,183,178,0.18) 1px, transparent 1px),
              linear-gradient(to top, #eef4f8 60%, transparent)
            `,
            backgroundSize: "10px 10px, 10px 10px, 100% 100%",
          }}
        />
      </div>

      {decorativeAssets.map((asset, i) => (
        <div
          key={i}
          className={`sticker-slot hidden md:block ${asset.className}`}
          style={asset.style}
        >
          <img src={asset.src} alt={asset.alt} className="h-auto w-full object-contain" />
        </div>
      ))}

      <div
        className="relative z-20 mx-auto max-w-7xl px-5 pb-16 pt-[112px] md:px-8 md:pt-[126px] lg:px-10"
        style={{
          transform: `translateY(${contentTranslate}px)`,
          opacity: contentOpacity,
          willChange: "transform, opacity",
        }}
      >
        <div className="grid min-h-[calc(100vh-130px)] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-7 md:gap-8">
            <div className="flex items-center gap-4">
              <img src="/icon chọn 1.png" alt="" className="h-14 w-14 object-contain" />
              <img src="/icon chọn 2.png" alt="" className="h-14 w-14 object-contain" />
            </div>

            <img
              src="/slogan.png"
              alt="NOTEKIT Slogan"
              className="h-auto w-full max-w-[560px] shrink-0 object-contain"
            />

            <img
              src="/mô tả sổ.png"
              alt="Mô tả sổ"
              className="h-auto w-full max-w-[470px] object-contain"
            />

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("builder");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <img
                src="/CTA button.png"
                alt="Lắp sổ ngay"
                className="h-[66px] w-auto object-contain md:h-[72px]"
              />
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[540px] px-10 md:px-12">
              <button
                type="button"
                aria-label="Ảnh trước"
                onClick={goPrev}
                className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a1560] text-white shadow-paper transition-transform hover:scale-105"
              >
                <span aria-hidden>◀</span>
              </button>

              <div className="scrapbook-box shadow-paper relative mx-auto aspect-[4/3] w-full max-w-[490px] overflow-hidden rounded-[20px] bg-white">
                {slides.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Notebook ${i + 1}`}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out ${
                      i === current ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Ảnh tiếp theo"
                onClick={goNext}
                className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a1560] text-white shadow-paper transition-transform hover:scale-105"
              >
                <span aria-hidden>▶</span>
              </button>

              <div className="mt-5 flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "h-2.5 w-7 bg-[#0a1560]"
                        : "h-2.5 w-2.5 bg-foreground/25 hover:bg-foreground/40"
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
