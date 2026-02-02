import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const scrollToBuilder = () => {
    const builderSection = document.getElementById("builder");
    if (builderSection) {
      builderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-12 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none rotate-chaos-2">
                <span className="marker-underline">LẮP THEO Ý.</span>
              </h1>
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none rotate-chaos-3">
                <span className="marker-underline">GHI ĐÚNG GU.</span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="font-body text-lg md:text-xl max-w-md leading-relaxed">
              Sổ còng B5 tự lắp ráp (DIY). Bìa chất, giấy dày, chấp mọi loại bút highlight.
            </p>

            {/* CTA Button */}
            <button 
              onClick={scrollToBuilder}
              className="brutal-btn-primary text-lg group flex items-center gap-3 neon-glow"
            >
              LẮP SỔ NGAY
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Fun sticker */}
            <div className="sticker inline-block mt-4">
              ✨ DIY = DO IT YOURSELF ✨
            </div>
          </div>

          {/* Right Side - Product Image Placeholder */}
          <div className="relative">
            <div className="brutal-box p-4 bg-secondary rotate-chaos-1">
              <div className="aspect-square bg-muted border-[3px] border-foreground flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="font-heading text-4xl mb-4">📓</div>
                  <p className="font-body text-muted-foreground text-sm uppercase tracking-wide">
                    Notebook Bundle
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-2">
                    (Ảnh sản phẩm sẽ được thêm sau)
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 sticker text-xs hidden md:block">
              HOT! 🔥
            </div>
            <div className="absolute -bottom-4 -left-4 brutal-box px-3 py-1 bg-background rotate-3 hidden md:block">
              <span className="font-heading text-sm">Made in VN 🇻🇳</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
