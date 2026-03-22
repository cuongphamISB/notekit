import { useCart } from "@/contexts/CartContext";

/**
 * Header uses ONLY image assets for nav items — the PNG files are
 * pre-rendered button graphics that include the pill shape, text, and icon.
 * No text spans; no Shadcn wrappers; pure flexbox.
 */
const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-[100] bg-transparent">
      <div className="mx-auto flex h-[88px] max-w-[1440px] items-center px-4 md:px-6">

        {/* ── LOGO — left of the margin line ── */}
        <a href="/" className="shrink-0" aria-label="Trang chủ">
          <img
            src="/LOGO.png"
            alt="NOTEKIT"
            className="h-[64px] w-auto object-contain md:h-[76px]"
          />
        </a>

        {/* ── "Trang chủ" pill — image-only, adjacent to logo ── */}
        <a
          href="/"
          className="ml-4 shrink-0 transition-transform duration-150 hover:scale-[1.02]"
          aria-label="Trang chủ"
        >
          <img
            src="/trang chủ icon.png"
            alt="Trang chủ"
            className="h-[52px] w-auto object-contain md:h-[58px]"
          />
        </a>

        {/* ── Spacer ── */}
        <div className="flex-1" />

        {/* ── Right nav: search + giỏ hàng ── */}
        <div className="flex items-center gap-3 md:gap-4">

          {/* Search — completely transparent, no background, no border */}
          <button
            type="button"
            aria-label="Tìm kiếm"
            className="bg-transparent p-0 transition-transform duration-150 hover:scale-105"
          >
            <img
              src="/search icon 1.png"
              alt="Tìm kiếm"
              className="h-[48px] w-[48px] object-contain md:h-[54px] md:w-[54px]"
            />
          </button>

          {/* Giỏ hàng pill — image-only */}
          <div className="relative">
            <button
              type="button"
              aria-label="Giỏ hàng"
              className="bg-transparent p-0 transition-transform duration-150 hover:scale-[1.02]"
            >
              <img
                src="/giỏ hàng icon.png"
                alt="Giỏ hàng"
                className="h-[52px] w-auto object-contain md:h-[58px]"
              />
            </button>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
