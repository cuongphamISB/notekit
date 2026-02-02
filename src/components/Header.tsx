import { ShoppingBag } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-[3px] border-foreground">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="brutal-box px-4 py-2 bg-background rotate-chaos-3">
          <span className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
            NOTEKIT
          </span>
        </div>

        {/* Cart Button */}
        <button className="brutal-btn-outline flex items-center gap-2 text-sm">
          <ShoppingBag className="w-5 h-5" />
          <span className="hidden sm:inline">GIỎ HÀNG</span>
          <span className="brutal-box px-2 py-0.5 text-xs bg-primary">0</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
