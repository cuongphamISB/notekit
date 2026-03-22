import { useCart } from "@/contexts/CartContext";
import { GOOGLE_FORM_ORDER_VIEW_URL } from "@/constants/checkout";
import { useEffect, useState } from "react";

const Header = () => {
  const { cartCount, clearCart } = useCart();
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
          {/* Trang trí — cùng vị trí như trước, không mở tìm kiếm */}
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
            <a
              href={GOOGLE_FORM_ORDER_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cart-active={cartCount > 0 ? "" : undefined}
              className="header-cart-link bg-transparent p-0 transition-transform duration-150 hover:scale-[1.03]"
              aria-label={
                cartCount > 0
                  ? `Giỏ hàng — ${cartCount} đơn — mở biểu mẫu đặt hàng`
                  : "Giỏ hàng — chưa có đơn, cuộn tới nút cuối trang để thêm"
              }
              onClick={(e) => {
                if (cartCount === 0) {
                  e.preventDefault();
                  document
                    .getElementById("order-cta")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                } else {
                  clearCart();
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
            </a>
            {cartCount > 0 && (
              <span className="header-cart-badge absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
