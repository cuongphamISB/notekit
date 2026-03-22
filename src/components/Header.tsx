import { useCart } from "@/contexts/CartContext";

/**
 * Header uses ONLY image assets for nav items — PNGs include pill shape, text, icon.
 *
 * SCALING: All heights use vw units so the header tracks with the background.png
 * blue baseline. The first horizontal blue rule sits at ≈5.6vw from the top
 * (calibrated to the background image's aspect ratio). Menu icons are bottom-aligned
 * to sit right on that line.
 *
 * Layout: [Logo | Trang chủ] ──── spacer ──── [Search | Giỏ hàng]
 * The entire header lives left-to-right across the viewport (no max-width centering)
 * so the logo stays in the left-margin zone (< 18vw) and the menu aligns with content.
 */
const Header = () => {
  const { cartCount } = useCart();

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] bg-transparent"
      style={{ height: "clamp(83px, 5.8vw, 100px)" }}
    >
      {/* Full-width flex row, NO max-width — elements pin to viewport edges */}
      <div
        className="flex h-full w-full items-end pb-[0.6vw]"
        style={{ paddingLeft: "clamp(8px, 1vw, 16px)", paddingRight: "clamp(8px, 1.5vw, 24px)" }}
      >
        {/* ── LOGO — stays left of the red margin line ── */}
        <a href="/" className="shrink-0" aria-label="Trang chủ">
          <img
            src="/LOGO.png"
            alt="NOTEKIT"
            className="h-auto w-auto object-contain"
            style={{ height: "clamp(40px, 4vw, 72px)" }}
          />
        </a>

        {/* ── "Trang chủ" pill — image-only, next to logo ── */}
        <a
          href="/"
          className="ml-[1vw] shrink-0 transition-transform duration-150 hover:scale-[1.03]"
          aria-label="Trang chủ"
        >
          <img
            src="/trang chủ icon.png"
            alt="Trang chủ"
            className="h-auto w-auto object-contain"
            style={{ height: "40px", width: "190px", display: "flex", flexWrap: "wrap" }}
          />
        </a>

        {/* ── Spacer ── */}
        <div className="flex-1" />

        {/* ── Right nav: search + giỏ hàng ── */}
        <div
          className="flex items-end"
          style={{ gap: "clamp(8px, 1.2vw, 20px)" }}
        >
          {/* Search — transparent, icon only */}
          <button
            type="button"
            aria-label="Tìm kiếm"
            className="bg-transparent p-0 transition-transform duration-150 hover:scale-105"
          >
            <img
              src="/search icon 1.png"
              alt="Tìm kiếm"
              className="h-auto w-auto object-contain"
              style={{ height: "clamp(34px, 3.4vw, 60px)" }}
            />
          </button>

          {/* Giỏ hàng pill — image-only */}
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
                style={{ height: "clamp(36px, 3.6vw, 64px)" }}
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
