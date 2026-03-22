import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/">
          <img
            src="/LOGO.png"
            alt="NOTEKIT"
            className="h-[50px] w-auto object-contain"
          />
        </a>

        {/* Right Nav — 2rem gap */}
        <nav className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/trang chủ icon.png" alt="" className="w-5 h-5 object-contain" />
            <span className="hidden md:inline text-sm">trang chủ</span>
          </a>

          <button className="hover:opacity-80 transition-opacity">
            <img src="/search icon 1.png" alt="Tìm kiếm" className="w-5 h-5 object-contain" />
          </button>

          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity relative">
            <img src="/giỏ hàng icon.png" alt="Giỏ hàng" className="w-5 h-5 object-contain" />
            <span className="hidden md:inline text-sm">giỏ hàng</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-secondary text-secondary-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
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
