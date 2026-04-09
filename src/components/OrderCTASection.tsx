import { useCart } from "@/contexts/CartContext";
import type { PaperKind } from "@/contexts/CartContext";
import { COVER_PRODUCTS } from "@/data/coverProducts";
import { STICKER_PRODUCTS } from "@/data/stickerProducts";
import { useEffect, useRef, useState } from "react";

/** Ảnh CTA gốc trong public (có khoảng trắng trong tên file) */
const CTA_ORDER_IMAGE = "/CTA 2.webp";

function paperLabel(kind: PaperKind): string {
  return kind === "lined" ? "giấy kẻ ngang" : "giấy caro";
}

const OrderCTASection = () => {
  const {
    addCurrentOrderToCart,
    selectedCoverIndex,
    paperKind,
    selectedStickerIndex,
    cartCount,
  } = useCart();

  // Refs always hold the latest values — eliminates stale-closure bugs in the click handler
  const coverIndexRef = useRef(selectedCoverIndex);
  const paperKindRef = useRef(paperKind);
  const stickerIndexRef = useRef(selectedStickerIndex);
  const addToCartRef = useRef(addCurrentOrderToCart);

  coverIndexRef.current = selectedCoverIndex;
  paperKindRef.current = paperKind;
  stickerIndexRef.current = selectedStickerIndex;
  addToCartRef.current = addCurrentOrderToCart;

  const [feedbackDetail, setFeedbackDetail] = useState<{
    cover: string;
    coverColor: string;
    paper: string;
    sticker: string | null;
    stickerColor: string | null;
  } | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stable click handler — reads always-fresh values from refs
  const handleAdd = useRef(() => {
    const coverIndex = coverIndexRef.current;
    if (coverIndex === null) {
      document.getElementById("cover-picker")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    addToCartRef.current();
    const product = COVER_PRODUCTS[coverIndex];
    const cover = product?.name ?? "đã chọn";
    const coverColor = product?.color ?? "#9B85CC";
    const ruột = paperLabel(paperKindRef.current);
    const stickerIdx = stickerIndexRef.current;
    const sticker = stickerIdx !== null ? (STICKER_PRODUCTS[stickerIdx]?.name ?? null) : null;
    const stickerColor = stickerIdx !== null ? (STICKER_PRODUCTS[stickerIdx]?.color ?? null) : null;
    setFeedbackDetail({ cover, coverColor, paper: ruột, sticker, stickerColor });
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setFeedbackDetail(null), 4500);
  }).current;

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
                  style={{ color: feedbackDetail.coverColor }}
                >
                  {feedbackDetail.cover}
                </span>
                {", ruột "}
                <span
                  className="order-cta-feedback-accent"
                  style={{ color: feedbackDetail.coverColor }}
                >
                  {feedbackDetail.paper}
                </span>
                {feedbackDetail.sticker ? (
                  <>
                    {" và sticker "}
                    <span
                      className="order-cta-feedback-accent"
                      style={{ color: feedbackDetail.stickerColor ?? feedbackDetail.coverColor }}
                    >
                      {feedbackDetail.sticker}
                    </span>
                  </>
                ) : null}
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
