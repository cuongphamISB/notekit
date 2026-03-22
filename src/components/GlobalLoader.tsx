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
      style={{ backgroundColor: "#eef4f8" }}
    >
      <div className="animate-bounce">
        <img
          alt="Loading"
          className="w-48 h-48 object-contain drop-shadow-lg"
          src="/sticker nhân vật.png"
        />
      </div>
      <p className="text-2xl md:text-3xl mt-6 animate-pulse" style={{ color: "hsl(30 10% 45%)" }}>
        Đang lắp ráp...
      </p>
    </div>
  );
};

export default GlobalLoader;
