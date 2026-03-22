import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-6 md:px-10 py-4 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src="/LOGO.png"
            alt="NOTEKIT Logo"
            className="h-10 md:h-14 w-auto object-contain"
          />
        </a>

        {/* Right Nav */}
        <nav className="flex items-center gap-4 md:gap-6">
          {/* Trang chủ */}
          <a href="/" className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <img src="/trang chủ icon.png" alt="" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            <span className="hidden md:inline text-sm text-foreground">trang chủ</span>
          </a>

          {/* Search */}
          <button className="opacity-80 hover:opacity-100 transition-opacity">
            <img src="/search icon 1.png" alt="Tìm kiếm" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
          </button>

          {/* Giỏ hàng */}
          <button className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity relative">
            <img src="/giỏ hàng icon.png" alt="Giỏ hàng" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            <span className="hidden md:inline text-sm text-foreground">giỏ hàng</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
