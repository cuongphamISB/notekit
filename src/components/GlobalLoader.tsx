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
  "/giá.png",

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

const MAX_WAIT_MS = 4000;
const MIN_VISIBLE_MS = 400; // Reduced for faster PWA load

function preloadAllFonts(): Promise<void> {
  if (!document.fonts?.ready) return Promise.resolve();
  return document.fonts.ready.then(() => undefined);
}

const GlobalLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const totalAssets = UNIQUE_IMAGES.length + 1; // +1 for fonts

    const updateProgress = () => {
      loadedCount++;
      if (!cancelled) {
        setProgress(Math.floor((loadedCount / totalAssets) * 100));
      }
    };

    // Prepare individual promises to track their completion
    const imagePromises = UNIQUE_IMAGES.map((url) => 
      preloadImage(url).then(updateProgress).catch(updateProgress) // Count even if it fails
    );

    const fontPromise = preloadAllFonts().then(updateProgress).catch(updateProgress);

    const minDelay = new Promise<void>((r) => setTimeout(r, MIN_VISIBLE_MS));
    const timeout = new Promise<void>((r) => setTimeout(r, MAX_WAIT_MS));

    const allAssets = Promise.all([...imagePromises, fontPromise, minDelay]);

    Promise.race([allAssets, timeout]).then(() => {
      if (cancelled) return;
      setProgress(100); // Ensure it hits 100%
      setTimeout(() => {
        if (!cancelled) setIsFading(true);
        setTimeout(() => {
          if (!cancelled) setIsVisible(false);
        }, 400); // reduced fade time
      }, 150); // slight pause at 100%
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-400 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#eef4f8" }}
    >
      <div className={progress < 100 ? "animate-bounce" : "scale-110 transition-transform duration-300"}>
        <img
          alt="Loading"
          className="w-48 h-48 object-contain drop-shadow-lg"
          src="/sticker nhân vật.webp"
        />
      </div>
      
      <p
        className={`text-xl md:text-2xl mt-6 font-medium ${progress < 100 ? "animate-pulse" : ""}`}
        style={{ color: "hsl(30 10% 45%)" }}
      >
        {progress < 100 ? "Đang lắp ráp hệ thống..." : "Hoàn tất lắp ráp!"}
      </p>

      {/* Progress Bar Container */}
      <div className="w-64 h-3 bg-slate-200 rounded-full mt-4 overflow-hidden border border-slate-300/50 shadow-inner">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm mt-2 text-slate-500 font-semibold">{progress}%</p>
    </div>
  );
};

export default GlobalLoader;
