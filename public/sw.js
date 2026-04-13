const CACHE_NAME = "notekit-v6";

const PRECACHE_URLS = [
  "/",
  "/LOGO.webp",
  "/slogan.png",
  "/mô tả sổ.png",
  "/CTA button.webp",
  "/CTA 2.webp",
  "/sticker nhân vật.webp",
  "/trang chủ icon.png",
  "/search icon 1.png",
  "/giỏ hàng icon.png",
  "/sao xanh lam.png",
  "/sao vàng.png",
  "/sao màu hồng.png",
  "/sao tím đậm.png",
  "/mkt_result.webp",
  "/fin_result.webp",
  "/ibu_result.webp",
  "/accounting_result.webp",
  "/man_result.webp",
  "/nam mkt.webp",
  "/nữ mkt.webp",
  "/nam fin.webp",
  "/nữ fin.webp",
  "/nam ibu.webp",
  "/nữ ibu.webp",
  "/nam accounting.webp",
  "/nữ accounting.webp",
  "/nam man.webp",
  "/nữ man.webp",
  "/SVN-Achiko.otf",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((n) => n !== CACHE_NAME)
            .map((n) => caches.delete(n))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Removed 'fetch' handler intentionally. 
// Without a fetch handler, Chrome on Android will NOT trigger the aggressive "WebAPK" installation flow
// that requires "Allow Chrome to install apps" permission. Instead, it will gracefully fall back 
// to a simpler "Add to Home screen" shortcut, which still opens in standalone fullscreen mode 
// (because of manifest.json) but is much more frictionless for the user to add!
