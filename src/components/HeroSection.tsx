import { ArrowRight } from "lucide-react";
import bundleImage from "@/assets/bookcover-bundle.png";
import stickerBunny from "@/assets/sticker-bunny.svg";
import stickerBow from "@/assets/sticker-bow.svg";
const HeroSection = () => {
  const scrollToBuilder = () => {
    const builderSection = document.getElementById("builder");
    if (builderSection) {
      builderSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section className="min-h-screen pt-24 pb-12 flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 lg:space-y-8 relative">
            {/* Sticker slot - top left of headline */}
            <div className="sticker-slot -top-8 -left-4 w-20 h-20 hidden md:block animate-float">
              <img src={stickerBunny} alt="Cute bunny sticker" className="w-full h-full object-contain" />
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none rotate-playful-2">
                <span className="marker-underline">LẮP THEO Ý.</span>
              </h1>
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none rotate-playful-3">
                <span className="marker-underline marker-underline-blue">GHI ĐÚNG GU.</span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="font-body text-lg md:text-xl max-w-md leading-relaxed text-muted-foreground">
              Sổ còng B5 tự lắp ráp (DIY). Bìa chất, giấy dày, chấp mọi loại bút highlight.
            </p>

            {/* CTA Button with sticker */}
            <div className="relative inline-block">
              <button onClick={scrollToBuilder} className="washi-btn-primary text-lg group flex items-center gap-3 soft-glow">
                LẮP SỔ NGAY
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* Sticker on button */}
              <div className="sticker-slot -top-6 -right-8 w-12 h-12 hidden md:block">
                <img src={stickerBow} alt="Cute bow sticker" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Fun sticker */}
            <div className="sticker sticker-blue inline-block mt-4">
              ✨ DIY = DO IT YOURSELF ✨
            </div>
          </div>

          {/* Right Side - Product Image */}
          <div className="relative">
            <div className="scrapbook-box p-4 bg-pastel-cream rotate-playful-1">
              <div className="aspect-square bg-card border-sketch flex items-center justify-center overflow-hidden">
                <img src={bundleImage} alt="NOTEKIT Notebook Bundle" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 sticker sticker-pink text-xs hidden md:block">
              HOT! 🔥
            </div>
            <div className="absolute -bottom-4 -left-4 tape-strip hidden md:block">
              <span className="font-heading text-sm">Made with love       </span>
            </div>

            {/* Additional floating sticker */}
            <div className="sticker-slot -bottom-8 right-8 w-16 h-16 hidden lg:block animate-wiggle">
              <img src={stickerBunny} alt="Decorative sticker" className="w-full h-full object-contain opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;