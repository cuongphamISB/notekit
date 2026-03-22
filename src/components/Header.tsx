import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="header-bar" data-scrolled={scrolled || undefined}>
      <div className="header-inner">
        <a
          href="/"
          className="header-logo-zone flex h-full shrink-0 items-center justify-center px-0.5"
          aria-label="Trang chủ"
        >
          <img
            src="/LOGO.png"
            alt="NOTEKIT"
            className="header-logo-img w-full max-md:h-auto max-md:w-auto max-md:max-h-none object-contain"
          />
        </a>

        <div className="shrink-0" style={{ width: "1vw" }} />

        <a
          href="/"
          className="header-home-link shrink-0 transition-transform duration-150 hover:scale-[1.03]"
          aria-label="Trang chủ"
        >
          <img
            src="/trang chủ icon.png"
            alt="Trang chủ"
            className="h-auto w-auto object-contain"
            style={{ height: "var(--header-icon-h)" }}
          />
        </a>

        <div className="flex-1" />

        <div
          className="header-actions flex items-center"
          style={{
            gap: "clamp(6px, 1vw, 18px)",
          }}
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
              style={{ height: "var(--header-icon-h)" }}
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
