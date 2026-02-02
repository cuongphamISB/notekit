import { useState, useEffect } from "react";
import stickerBunnyLoader from "@/assets/sticker-bunny-loader.png";

const GlobalLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    // Completely hide after fade animation (2.5s total)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#FDFBF7" }}
    >
      {/* Bouncing Sticker */}
      <div className="animate-bounce">
        <img
          src={stickerBunnyLoader}
          alt="Loading bunny"
          className="w-40 h-40 object-contain drop-shadow-lg"
        />
      </div>

      {/* Handwritten text */}
      <p className="font-heading text-xl md:text-2xl text-muted-foreground mt-4 animate-pulse">
        Đang lắp ráp...
      </p>
    </div>
  );
};

export default GlobalLoader;
