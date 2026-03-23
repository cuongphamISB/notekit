import { CAROUSEL_SLIDE_URLS } from "@/constants/carouselSlides";

/**
 * Preload a single image — resolves when decoded (or on error).
 * Never rejects so Promise.all always completes.
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    const done = () => resolve();
    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().then(done).catch(done);
      } else {
        done();
      }
    };
    img.onerror = done;
    img.src = src;
  });
}

export function preloadImages(urls: readonly string[]): Promise<void> {
  return Promise.all(urls.map(preloadImage)).then(() => undefined);
}

export function preloadCarouselSlides(): Promise<void> {
  return preloadImages(CAROUSEL_SLIDE_URLS);
}
