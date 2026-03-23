const CACHE_NAME = "notekit-v1";

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
  "/mkt (ko nhãn)_result.webp",
  "/fin (ko nhãn)_result.webp",
  "/ibu (ko nhãn)_result.webp",
  "/accounting (ko nhãn)_result.webp",
  "/man (ko nhãn)_result.webp",
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

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        // Serve from cache, update in background (stale-while-revalidate)
        const fetchPromise = fetch(request)
          .then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
          .catch(() => cached);

        return cached;
      }

      return fetch(request).then((response) => {
        if (
          response.ok &&
          (request.url.match(/\.(webp|png|svg|otf|woff2?|css|js)(\?|$)/) ||
            request.url.endsWith("/"))
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});
