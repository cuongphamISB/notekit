import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { STICKER_PRODUCTS } from "@/data/stickerProducts";

const StickerPickerSection = () => {
  const { selectedStickerIndex, setSelectedStickerIndex } = useCart();

  return (
    <div className="sticker-picker-block" id="sticker-picker">
      <h2 className="cover-picker-title paper-inner-title paper-accessories-title">
        chọn sticker
      </h2>

      {/* Grid: 5 items — row on desktop, column on mobile */}
      <div className="sticker-picker-grid">
        {STICKER_PRODUCTS.map((p, i) => {
          const isSelected = selectedStickerIndex === i;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={isSelected}
              aria-label={isSelected ? `${p.name} — đang chọn` : `Chọn sticker ${p.name}`}
              onClick={() =>
                setSelectedStickerIndex(isSelected ? null : i)
              }
              className={cn("sticker-pick-card", isSelected && "sticker-pick-card--selected")}
              style={
                {
                  "--sp-color": p.color,
                  "--sp-bg": p.bgSelected,
                } as React.CSSProperties
              }
            >
              {/* Blurred background layer — mirrors cover-showcase-bg */}
              <span className="sticker-pick-bg" aria-hidden>
                <img
                  src={p.stickerImg}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="sticker-pick-bg-img"
                />
              </span>

              {/* Sticker image */}
              <div className="sticker-pick-img-wrap">
                <img
                  src={p.stickerImg}
                  alt={p.name}
                  loading="lazy"
                  draggable={false}
                  className="sticker-pick-img"
                />
              </div>

              {/* Label */}
              <span className="sticker-pick-name">{p.name}</span>

              {/* Selection tick */}
              <span className="sticker-pick-tick" aria-hidden>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </button>
          );
        })}
      </div>

      {/* Selection summary */}
      <p className="sticker-pick-summary" role="status" aria-live="polite">
        {selectedStickerIndex !== null ? (
          <>
            <span className="sticker-pick-summary-label">
              đang chọn:{" "}
            </span>
            <span
              className="sticker-pick-summary-value"
              style={{ color: STICKER_PRODUCTS[selectedStickerIndex]?.color }}
            >
              {STICKER_PRODUCTS[selectedStickerIndex]?.name}
            </span>
          </>
        ) : (
          <span className="sticker-pick-summary-label sticker-pick-summary-label--none">
            chưa chọn sticker
          </span>
        )}
      </p>
    </div>
  );
};

export default StickerPickerSection;
