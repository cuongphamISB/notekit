import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-[100] bg-transparent">
      <div className="mx-auto flex h-[90px] w-full max-w-7xl items-center justify-between px-4 md:px-8 lg:px-10">
        <div className="flex items-center gap-5 md:gap-6">
          <a href="/" aria-label="Trang chủ">
            <img
              src="/LOGO.png"
              alt="NOTEKIT"
              className="h-[62px] w-auto object-contain md:h-[70px]"
            />
          </a>

          <a
            href="/"
            className="flex items-center gap-2 rounded-full bg-[#0a1560] px-4 py-2 text-white shadow-paper transition-transform duration-200 hover:scale-[1.02]"
          >
            <span className="font-main text-[22px] leading-none tracking-wide">trang chủ</span>
            <img src="/trang chủ icon.png" alt="" className="h-6 w-6 object-contain" />
          </a>
        </div>

        <nav className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            aria-label="Tìm kiếm"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-paper transition-transform duration-200 hover:scale-105"
          >
            <img src="/search icon 1.png" alt="" className="h-7 w-7 object-contain" />
          </button>

          <button
            type="button"
            aria-label="Giỏ hàng"
            className="relative flex items-center gap-2 rounded-full bg-[#0a1560] px-5 py-2.5 text-white shadow-paper transition-transform duration-200 hover:scale-[1.02]"
          >
            <span className="font-main text-[24px] leading-none tracking-wide">giỏ hàng</span>
            <img src="/giỏ hàng icon.png" alt="" className="h-7 w-7 object-contain" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-secondary-foreground">
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
