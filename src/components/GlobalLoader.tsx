import { useState, useEffect } from "react";
import { preloadImage } from "@/lib/preloadSlides";
import { COVER_PRODUCTS } from "@/data/coverProducts";
import { CAROUSEL_SLIDE_URLS } from "@/constants/carouselSlides";

/**
 * Every image URL used across the entire page.
 * Single source of truth — loader won't dismiss until all are decoded.
 */
const ALL_PAGE_IMAGES: readonly string[] = [
  // Header
  "/LOGO.webp",
  "/trang chủ icon.png",
  "/search icon 1.png",
  "/giỏ hàng icon.png",

  // Hero
  "/slogan.png",
  "/mô tả sổ.png",
  "/CTA button.webp",
  "/sticker nhân vật.webp",

  // Carousel (also used in cover picker showcase)
  ...CAROUSEL_SLIDE_URLS,

  // Cover product stickers
  ...COVER_PRODUCTS.flatMap((p) => [p.stickerLeft, p.stickerRight]),

  // Stars (small but avoid any flash)
  "/sao xanh lam.png",
  "/sao vàng.png",
  "/sao màu hồng.png",
  "/sao tím đậm.png",

  // Order CTA
  "/CTA 2.webp",
];

const UNIQUE_IMAGES = [...new Set(ALL_PAGE_IMAGES)];

const MAX_WAIT_MS = 3000;
const MIN_VISIBLE_MS = 600;

function preloadAllFonts(): Promise<void> {
  if (!document.fonts?.ready) return Promise.resolve();
  return document.fonts.ready.then(() => undefined);
}

const GlobalLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const minDelay = new Promise<void>((r) => setTimeout(r, MIN_VISIBLE_MS));
    const timeout = new Promise<void>((r) => setTimeout(r, MAX_WAIT_MS));

    const allAssets = Promise.all([
      ...UNIQUE_IMAGES.map(preloadImage),
      preloadAllFonts(),
      minDelay,
    ]);

    Promise.race([allAssets, timeout]).then(() => {
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
          src="/sticker nhân vật.webp"
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
