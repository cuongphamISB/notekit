import { ShoppingBag } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b-2 border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="scrapbook-box px-4 py-2 bg-pastel-pink rotate-playful-3">
          <span className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
            NOTEKIT
          </span>
        </div>

        {/* Cart Button */}
        <button className="washi-btn-secondary flex items-center gap-2 text-sm">
          <ShoppingBag className="w-5 h-5" />
          <span className="hidden sm:inline">GIỎ HÀNG</span>
          <span className="scrapbook-box px-2 py-0.5 text-xs bg-pastel-orange">0</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
