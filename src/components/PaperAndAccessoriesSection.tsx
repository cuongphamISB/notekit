import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

type PaperKind = "lined" | "grid";

const SECTION_STARS = [
  { src: "/sao xanh lam.png", style: { top: "8%", left: "5%", width: "clamp(20px,3.8vw,62px)" } },
  { src: "/sao màu hồng.png", style: { top: "3%", right: "10%", width: "clamp(24px,4.2vw,70px)" } },
  { src: "/sao vàng.png", style: { bottom: "18%", left: "6%", width: "clamp(22px,3.8vw,60px)" } },
  { src: "/sao tím đậm.png", style: { bottom: "8%", right: "8%", width: "clamp(20px,3.4vw,56px)" } },
  { src: "/sao xanh lam.png", style: { top: "48%", right: "4%", width: "clamp(18px,3vw,48px)" } },
] as const;

const ACCESSORIES_STARS = [
  { src: "/sao màu hồng.png", style: { top: "6%", left: "12%", width: "clamp(22px,4vw,64px)" } },
  { src: "/sao xanh lam.png", style: { top: "4%", right: "14%", width: "clamp(20px,3.6vw,58px)" } },
  { src: "/sao vàng.png", style: { bottom: "12%", left: "8%", width: "clamp(24px,4vw,68px)" } },
] as const;

const PaperAndAccessoriesSection = () => {
  const { paperKind: paper, setPaperKind: setPaper } = useCart();

  return (
    <section className="paper-inner-section" id="paper-refill">
      {SECTION_STARS.map((s, i) => (
        <div key={`p-${i}`} className="sticker-slot" style={s.style}>
          <img src={s.src} alt="" aria-hidden className="h-auto w-full object-contain" />
        </div>
      ))}

      <h2 className="cover-picker-title paper-inner-title paper-inner-title--with-note">
        chọn ruột giấy
      </h2>
      <p className="paper-page-count-note">
        Mỗi bộ ruột sổ gồm <strong>100 trang</strong> nha ^^
      </p>

      <div className="paper-inner-layout">
        <div className="paper-polaroid-grid">
          <button
            type="button"
            aria-pressed={paper === "lined"}
            aria-label={
              paper === "lined"
                ? "Giấy kẻ ngang — đang chọn"
                : "Chọn giấy kẻ ngang"
            }
            onClick={() => setPaper("lined")}
            className={cn("paper-polaroid", paper === "lined" && "paper-polaroid--selected")}
          >
            <div className="paper-polaroid-grain-host">
              <div
                className="paper-polaroid-preview paper-preview-lined"
                aria-hidden
              />
              <span className="paper-polaroid-tick" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </div>
            <span className="paper-polaroid-caption">giấy kẻ ngang</span>
          </button>

          <button
            type="button"
            aria-pressed={paper === "grid"}
            aria-label={
              paper === "grid"
                ? "Giấy caro — đang chọn"
                : "Chọn giấy caro"
            }
            onClick={() => setPaper("grid")}
            className={cn("paper-polaroid", paper === "grid" && "paper-polaroid--selected")}
          >
            <div className="paper-polaroid-grain-host">
              <div
                className="paper-polaroid-preview paper-preview-grid"
                aria-hidden
              />
              <span className="paper-polaroid-tick" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </div>
            <span className="paper-polaroid-caption">giấy caro</span>
          </button>
        </div>

        <p className="paper-selection-summary" aria-live="polite">
          <span className="paper-selection-summary-label">đang chọn:</span>{" "}
          <span className="paper-selection-summary-value">
            {paper === "lined" ? "giấy kẻ ngang" : "giấy caro"}
          </span>
        </p>
      </div>

      <div className="paper-accessories-block" id="accessories">
        {ACCESSORIES_STARS.map((s, i) => (
          <div key={`a-${i}`} className="sticker-slot" style={s.style}>
            <img src={s.src} alt="" aria-hidden className="h-auto w-full object-contain" />
          </div>
        ))}
        <h2 className="cover-picker-title paper-inner-title paper-accessories-title">chọn phụ kiện</h2>
        <p className="paper-accessories-soon">coming soon....</p>
      </div>
    </section>
  );
};

export default PaperAndAccessoriesSection;
