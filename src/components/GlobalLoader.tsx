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
  return <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`} style={{
    backgroundColor: "#FDFBF7"
  }}>
      {/* Bouncing Sticker - GO BIG */}
      <div className="animate-bounce">
        <img alt="Loading bunny" className="w-72 h-72 drop-shadow-lg object-contain" src="/lovable-uploads/763155fb-4efa-4b81-b6c2-4fc62af5aa65.png" />
      </div>

      {/* Handwritten text - bigger and fun */}
      <p className="font-heading text-3xl md:text-4xl text-muted-foreground mt-6 animate-pulse">
        Đang lắp ráp...
      </p>
    </div>;
};
export default GlobalLoader;