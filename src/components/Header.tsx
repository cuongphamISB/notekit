import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { useEffect, useState } from "react";

const Header = () => {
  const { cartCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="header-bar" data-scrolled={scrolled || undefined}>
        <div className="header-inner">
          <a
            href="/"
            className="header-logo-zone flex h-full shrink-0 items-center justify-center px-0.5"
            aria-label="Trang chủ"
          >
            <img
              src="/LOGO.webp"
              alt="NOTEKIT"
              className="header-logo-img object-contain"
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
              style={{ height: "clamp(26px, 2.8vw, 50px)" }}
            />
          </a>

          <div className="flex-1" />

          <div
            className="header-actions flex items-center"
            style={{
              gap: "clamp(6px, 1vw, 18px)",
            }}
          >
            <span
              className="header-search-deco inline-flex shrink-0 select-none"
              aria-hidden
            >
              <img
                src="/search icon 1.png"
                alt=""
                className="h-auto w-auto object-contain"
                style={{ height: "var(--header-icon-h)" }}
                draggable={false}
              />
            </span>

            <div className="relative">
              <button
                type="button"
                data-cart-active={cartCount > 0 ? "" : undefined}
                className="header-cart-link bg-transparent p-0 transition-transform duration-150 hover:scale-[1.03] cursor-pointer"
                aria-label={
                  cartCount > 0
                    ? `Giỏ hàng — ${cartCount} sản phẩm`
                    : "Giỏ hàng — chưa có sản phẩm"
                }
                onClick={() => {
                  if (cartCount === 0) {
                    document
                      .getElementById("order-cta")
                      ?.scrollIntoView({ behavior: "smooth", block: "center" });
                  } else {
                    openCart();
                  }
                }}
              >
                <img
                  src="/giỏ hàng icon.png"
                  alt=""
                  aria-hidden
                  className="header-cart-icon h-auto w-auto object-contain"
                  style={{ height: "clamp(26px, 2.8vw, 50px)" }}
                />
              </button>
              {cartCount > 0 && (
                <span className="header-cart-badge absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  );
};

export default Header;
