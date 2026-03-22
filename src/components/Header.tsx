import { useCart } from "@/contexts/CartContext";

/**
 * Header calibrated to home.png mockup:
 *   • Height  ≈ 4.5 vw  (was 5.8 vw — was too tall at narrow viewports)
 *   • All icon heights scaled proportionally to the new header height
 *   • paddingLeft matches the content zone start (left side of the page)
 *
 * Layout: [Logo | Trang chủ] ──── spacer ──── [Search | Giỏ hàng]
 */
const Header = () => {
  const { cartCount } = useCart();

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] bg-transparent"
      style={{ height: "clamp(44px, 4.5vw, 80px)" }}
    >
      <div
        className="flex h-full w-full items-center"
        style={{
          paddingLeft:  "clamp(6px, 0.8vw, 14px)",
          paddingRight: "clamp(8px, 1.5vw, 24px)",
          paddingBottom: "clamp(4px, 0.4vw, 8px)",
        }}
      >
        {/* ── LOGO ── */}
        <a href="/" className="shrink-0" aria-label="Trang chủ">
          <img
            src="/LOGO.png"
            alt="NOTEKIT"
            className="h-auto w-auto object-contain"
            style={{ height: "clamp(28px, 3vw, 54px)" }}
          />
        </a>

        {/* ── "Trang chủ" pill ── */}
        <a
          href="/"
          className="ml-[1vw] shrink-0 transition-transform duration-150 hover:scale-[1.03]"
          aria-label="Trang chủ"
        >
          <img
            src="/trang chủ icon.png"
            alt="Trang chủ"
            className="h-auto w-auto object-contain"
            style={{ height: "clamp(26px, 2.6vw, 46px)" }}
          />
        </a>

        {/* ── Spacer ── */}
        <div className="flex-1" />

        {/* ── Right nav: search + giỏ hàng ── */}
        <div
          className="flex items-center"
          style={{ gap: "clamp(6px, 1vw, 18px)" }}
        >
          <button
            type="button"
            aria-label="Tìm kiếm"
            className="bg-transparent p-0 transition-transform duration-150 hover:scale-105"
          >
            <img
              src="/search icon 1.png"
              alt="Tìm kiếm"
              className="h-auto w-auto object-contain"
              style={{ height: "clamp(26px, 2.5vw, 44px)" }}
            />
          </button>

          <div className="relative">
            <button
              type="button"
              aria-label="Giỏ hàng"
              className="bg-transparent p-0 transition-transform duration-150 hover:scale-[1.03]"
            >
              <img
                src="/giỏ hàng icon.png"
                alt="Giỏ hàng"
                className="h-auto w-auto object-contain"
                style={{ height: "clamp(26px, 2.8vw, 50px)" }}
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
