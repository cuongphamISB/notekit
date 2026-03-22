import { useEffect, useRef, useState } from "react";

const slides = [
  "/mkt (ko nhãn)_result.webp",
  "/fin (ko nhãn)_result.webp",
  "/ibu (ko nhãn)_result.webp",
  "/accounting (ko nhãn)_result.webp",
  "/man (ko nhãn)_result.webp",
];

const decorativeStars = [
  { src: "/sao xanh lam.png", style: { top: "8vh", right: "6vw", width: "3vw", minWidth: 20, maxWidth: 48 } },
  { src: "/sao màu hồng.png", style: { top: "18vh", left: "4vw", width: "2.5vw", minWidth: 16, maxWidth: 40 } },
  { src: "/sao vàng.png", style: { bottom: "22vh", right: "10vw", width: "2.8vw", minWidth: 18, maxWidth: 44 } },
  { src: "/sao tím nhạt.png", style: { bottom: "35vh", left: "7vw", width: "2vw", minWidth: 14, maxWidth: 32 } },
  { src: "/sao tím đậm.png", style: { top: "45vh", right: "3vw", width: "2.2vw", minWidth: 14, maxWidth: 36 } },
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

  // Derived values for parallax / mask
  const contentTranslate = Math.min(scrollY * 0.5, 400);
  const contentOpacity = Math.max(1 - scrollY / 500, 0);
  const maskProgress = Math.min(scrollY / 300, 1); // 0 → 1

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ─── Scroll Mask Overlay ─── */}
      {/* Four border panels that close inward as user scrolls, creating a "slot" effect */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {/* Top panel */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: `${maskProgress * 30}vh`,
            background: "linear-gradient(to bottom, #eef4f8 60%, transparent)",
            backgroundImage: `
              linear-gradient(rgba(255,183,178,0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,183,178,0.18) 1px, transparent 1px),
              linear-gradient(to bottom, #eef4f8 60%, transparent)
            `,
            backgroundSize: "10px 10px, 10px 10px, 100% 100%",
          }}
        />
        {/* Bottom panel */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: `${maskProgress * 25}vh`,
            background: "linear-gradient(to top, #eef4f8 60%, transparent)",
            backgroundImage: `
              linear-gradient(rgba(255,183,178,0.18) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,183,178,0.18) 1px, transparent 1px),
              linear-gradient(to top, #eef4f8 60%, transparent)
            `,
            backgroundSize: "10px 10px, 10px 10px, 100% 100%",
          }}
        />
      </div>

      {/* ─── Decorative Stars (vw/vh sizing) ─── */}
      {decorativeStars.map((star, i) => (
        <div
          key={i}
          className="sticker-slot hidden md:block"
          style={{
            ...star.style,
            animation: `float-star ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <img src={star.src} alt="" className="w-full h-auto" />
        </div>
      ))}

      {/* ─── Sticker nhân vật — top right ─── */}
      <div
        className="sticker-slot hidden md:block animate-bounce"
        style={{ top: "10vh", right: "2vw", width: "8vw", minWidth: 60, maxWidth: 140 }}
      >
        <img src="/sticker nhân vật.png" alt="Sticker" className="w-full h-auto" />
      </div>

      {/* ─── Main Hero Content ─── */}
      <div
        className="relative z-20 mx-auto max-w-7xl px-6 md:px-10 pt-24 md:pt-28 pb-16"
        style={{
          transform: `translateY(${contentTranslate}px)`,
          opacity: contentOpacity,
          willChange: "transform, opacity",
        }}
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-10rem)]">
          {/* ── Left Column ── */}
          <div className="flex flex-col items-start gap-4">
            {/* Row 1: Two small icons */}
            <div className="flex items-center gap-3">
              <img src="/icon chọn 1.png" alt="" className="w-10 h-10 object-contain" />
              <img src="/icon chọn 2.png" alt="" className="w-10 h-10 object-contain" />
            </div>

            {/* Row 2: Slogan */}
            <img
              src="/slogan.png"
              alt="NOTEKIT Slogan"
              className="w-full max-w-[500px] object-contain"
            />

            {/* Row 3: Mô tả sổ */}
            <img
              src="/mô tả sổ.png"
              alt="Mô tả sổ"
              className="w-full max-w-[400px] object-contain mt-4"
            />

            {/* Row 4: CTA Button */}
            <button
              onClick={() => {
                const el = document.getElementById("builder");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-4 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <img
                src="/CTA button.png"
                alt="Lắp sổ ngay"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </button>
          </div>

          {/* ── Right Column: Carousel ── */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Carousel frame */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-white/50">
                {slides.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Notebook ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                      i === current ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
                    }`}
                  />
                ))}
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-7 h-2.5 bg-secondary"
                        : "w-2.5 h-2.5 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Float-star animation */}
      <style>{`
        @keyframes float-star {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
