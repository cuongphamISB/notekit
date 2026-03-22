import { CAROUSEL_SLIDE_URLS } from "@/constants/carouselSlides";

export function preloadCarouselSlides(): Promise<void> {
  return Promise.all(
    CAROUSEL_SLIDE_URLS.map(
      (src) =>
        new Promise<void>((resolve) => {
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
        })
    )
  ).then(() => undefined);
}
