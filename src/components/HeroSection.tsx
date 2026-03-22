import { useEffect, useRef, useState } from "react";

const carouselImages = [
  "/mkt (ko nhãn)_result.webp",
  "/fin (ko nhãn)_result.webp",
  "/ibu (ko nhãn)_result.webp",
  "/accounting (ko nhãn)_result.webp",
  "/man (ko nhãn)_result.webp",
];

const stars = [
  { src: "/sao xanh lam.png", className: "top-[10%] right-[8%] w-8 md:w-12", delay: "0s" },
  { src: "/sao màu hồng.png", className: "top-[25%] left-[5%] w-6 md:w-10", delay: "0.5s" },
  { src: "/sao vàng.png", className: "bottom-[20%] right-[12%] w-7 md:w-11", delay: "1s" },
  { src: "/sao tím nhạt.png", className: "bottom-[35%] left-[8%] w-5 md:w-8", delay: "1.5s" },
  { src: "/sao tím đậm.png", className: "top-[50%] right-[3%] w-6 md:w-9", delay: "0.8s" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll for mask/parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = Math.min(scrollY * 0.4, 300);
  const contentOpacity = Math.max(1 - scrollY / 600, 0);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-20 md:pt-24 pb-12 overflow-hidden"
    >
      {/* Decorative Stars - Floating */}
      {stars.map((star, i) => (
        <div
          key={i}
          className={`absolute ${star.className} pointer-events-none z-10 hidden md:block`}
          style={{
            animation: `float-gentle 4s ease-in-out infinite`,
            animationDelay: star.delay,
          }}
        >
          <img src={star.src} alt="" className="w-full h-auto object-contain drop-shadow-sm" />
        </div>
      ))}

      {/* Sticker nhân vật - top right */}
      <div className="absolute top-20 right-4 md:right-10 w-20 md:w-36 z-10 animate-bounce pointer-events-none">
        <img
          src="/sticker nhân vật.png"
          alt="Sticker nhân vật"
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </div>

      {/* Main Content with scroll parallax */}
      <div
        className="container mx-auto px-6 md:px-10 max-w-7xl relative z-20"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          opacity: contentOpacity,
          transition: "opacity 0.1s ease-out",
        }}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Column - Content Stack */}
          <div className="flex flex-col items-start gap-5 md:gap-7">
            {/* Two small icons */}
            <div className="flex items-center gap-3">
              <img
                src="/icon chọn 1.png"
                alt="Icon 1"
                className="w-10 h-10 md:w-14 md:h-14 object-contain"
              />
              <img
                src="/icon chọn 2.png"
                alt="Icon 2"
                className="w-10 h-10 md:w-14 md:h-14 object-contain"
              />
            </div>

            {/* Slogan Image */}
            <img
              src="/slogan.png"
              alt="NOTEKIT Slogan"
              className="w-full max-w-md md:max-w-lg object-contain"
            />

            {/* Mô tả sổ Image */}
            <img
              src="/mô tả sổ.png"
              alt="Mô tả sổ NOTEKIT"
              className="w-full max-w-sm md:max-w-md object-contain"
            />

            {/* CTA Button */}
            <button
              onClick={() => {
                const builder = document.getElementById("builder");
                builder?.scrollIntoView({ behavior: "smooth" });
              }}
              className="transition-transform hover:scale-105 active:scale-95"
            >
              <img
                src="/CTA button.png"
                alt="Lắp sổ ngay"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </button>
          </div>

          {/* Right Column - Image Carousel */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg mx-auto">
              {/* Carousel Container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-paper">
                {carouselImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Notebook design ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  />
                ))}
              </div>

              {/* Carousel Dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-6 h-2.5 bg-secondary"
                        : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Mask - content slides behind this overlay as you scroll */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: `linear-gradient(to top, #f8f9fc ${Math.min(scrollY / 5, 40)}%, transparent ${Math.min(scrollY / 3, 80)}%)`,
        }}
      />
    </section>
  );
};

export default HeroSection;
