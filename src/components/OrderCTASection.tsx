import { useCart } from "@/contexts/CartContext";
import type { PaperKind } from "@/contexts/CartContext";
import { ACCOUNTING_BOX_COLOR, COVER_PRODUCTS } from "@/data/coverProducts";
import { useCallback, useEffect, useRef, useState } from "react";

/** Ảnh CTA gốc trong public (có khoảng trắng trong tên file) */
const CTA_ORDER_IMAGE = "/CTA 2.png";

function paperLabel(kind: PaperKind): string {
  return kind === "lined" ? "giấy kẻ ngang" : "giấy caro";
}

const OrderCTASection = () => {
  const {
    addCurrentOrderToCart,
    selectedCoverIndex,
    paperKind,
    cartCount,
  } = useCart();
  const [feedbackDetail, setFeedbackDetail] = useState<{
    cover: string;
    paper: string;
  } | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAdd = useCallback(() => {
    if (selectedCoverIndex === null) {
      document.getElementById("cover-picker")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    addCurrentOrderToCart();
    const cover =
      COVER_PRODUCTS[selectedCoverIndex]?.name ?? "đã chọn";
    const ruột = paperLabel(paperKind);
    setFeedbackDetail({ cover, paper: ruột });
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setFeedbackDetail(null), 4500);
  }, [addCurrentOrderToCart, selectedCoverIndex, paperKind]);

  useEffect(
    () => () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    },
    []
  );

  /* Bấm giỏ → clearCart → ẩn dòng thông báo */
  useEffect(() => {
    if (cartCount === 0) setFeedbackDetail(null);
  }, [cartCount]);

  return (
    <section
      className="order-cta-section"
      id="order-cta"
      aria-labelledby="order-cta-heading"
    >
      <h2 id="order-cta-heading" className="sr-only">
        Đặt hàng — cùng tạo ngay
      </h2>
      <div className="order-cta-inner">
        <button
          type="button"
          className="order-cta-img-hit"
          onClick={handleAdd}
          aria-label="Thêm bộ sổ đã chọn vào giỏ — cùng tạo ngay"
        >
          {/* Cùng animation cta-float như CTA hero (CTA button.png) */}
          <span className="hero-cta-anim inline-block">
            <img
              src={CTA_ORDER_IMAGE}
              alt=""
              decoding="async"
              className="order-cta-img"
              draggable={false}
            />
          </span>
        </button>
        <p className="order-cta-feedback" role="status" aria-live="polite">
          {feedbackDetail ? (
            <>
              <span className="order-cta-feedback-main">
                Đã thêm vào giỏ &quot;bìa{" "}
                <span
                  className="order-cta-feedback-accent"
                  style={{ color: ACCOUNTING_BOX_COLOR }}
                >
                  {feedbackDetail.cover}
                </span>{" "}
                và ruột{" "}
                <span
                  className="order-cta-feedback-accent"
                  style={{ color: ACCOUNTING_BOX_COLOR }}
                >
                  {feedbackDetail.paper}
                </span>
                &quot;
              </span>
              <span className="order-cta-feedback-hint">
                Mở biểu tượng giỏ để sang form đặt hàng.
              </span>
            </>
          ) : null}
        </p>
      </div>
    </section>
  );
};

export default OrderCTASection;
