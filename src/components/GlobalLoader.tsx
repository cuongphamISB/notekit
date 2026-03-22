import { useState, useEffect } from "react";

const GlobalLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 2000);
    const hideTimer = setTimeout(() => setIsVisible(false), 2500);
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
      style={{ backgroundColor: "#f8f9fc" }}
    >
      <div className="animate-bounce">
        <img
          alt="Loading"
          className="w-60 h-60 drop-shadow-lg object-contain"
          src="/sticker nhân vật.png"
        />
      </div>
      <p className="text-3xl md:text-4xl text-muted-foreground mt-6 animate-pulse">
        Đang lắp ráp...
      </p>
    </div>
  );
};

export default GlobalLoader;
