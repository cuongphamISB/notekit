import { useState, useEffect } from "react";
import { preloadCarouselSlides, preloadImages } from "@/lib/preloadSlides";
import { COVER_PRODUCTS } from "@/data/coverProducts";

const OTHER_PRELOAD = [
  "/LOGO.webp",
  "/slogan.png",
  "/mô tả sổ.png",
  "/CTA button.png",
  "/CTA 2.png",
  "/sticker nhân vật.png",
  "/trang chủ icon.png",
  "/search icon 1.png",
  "/giỏ hàng icon.png",
  "/sao xanh lam.png",
  "/sao vàng.png",
  "/sao màu hồng.png",
];

const COVER_PRELOAD = COVER_PRODUCTS.flatMap((p) => [
  p.coverImg,
  p.stickerLeft,
  p.stickerRight,
]);

const MAX_WAIT_MS = 3000;
const MIN_VISIBLE_MS = 600;

const GlobalLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const minDelay = new Promise<void>((r) => setTimeout(r, MIN_VISIBLE_MS));
    const timeout = new Promise<void>((r) => setTimeout(r, MAX_WAIT_MS));

    const allPreloads = Promise.all([
      preloadCarouselSlides(),
      preloadImages(OTHER_PRELOAD),
      preloadImages(COVER_PRELOAD),
      minDelay,
    ]);

    Promise.race([allPreloads, timeout]).then(() => {
      if (cancelled) return;
      setIsFading(true);
      setTimeout(() => {
        if (!cancelled) setIsVisible(false);
      }, 450);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#eef4f8" }}
    >
      <div className="animate-bounce">
        <img
          alt="Loading"
          className="w-48 h-48 object-contain drop-shadow-lg"
          src="/sticker nhân vật.png"
        />
      </div>
      <p
        className="text-2xl md:text-3xl mt-6 animate-pulse"
        style={{ color: "hsl(30 10% 45%)" }}
      >
        Đang lắp ráp...
      </p>
    </div>
  );
};

export default GlobalLoader;
