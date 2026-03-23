import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { COVER_PRODUCTS } from "@/data/coverProducts";

const PRODUCTS = COVER_PRODUCTS;

const SECTION_STARS = [
  { src: "/sao xanh lam.png", style: { top: "4%", left: "7%", width: "clamp(22px,4.2vw,68px)" } },
  { src: "/sao vàng.png", style: { top: "2%", right: "8%", width: "clamp(26px,4.8vw,76px)" } },
  { src: "/sao xanh lam.png", style: { bottom: "12%", left: "4%", width: "clamp(20px,3.6vw,58px)" } },
  { src: "/sao màu hồng.png", style: { bottom: "6%", right: "46%", width: "clamp(20px,3.4vw,56px)" } },
  { src: "/sao tím đậm.png", style: { bottom: "5%", right: "6%", width: "clamp(22px,4vw,64px)" } },
];

const CoverPickerSection = () => {
  const { selectedCoverIndex, setSelectedCoverIndex } = useCart();
  const selected = selectedCoverIndex;
  const setSelected = setSelectedCoverIndex;
  const hasSelection = selected !== null;

  return (
    <section className="cover-picker" id="cover-picker">
      {SECTION_STARS.map((s, i) => (
        <div key={i} className="sticker-slot" style={s.style}>
          <img src={s.src} alt="" aria-hidden className="h-auto w-full object-contain" />
        </div>
      ))}

      <h2 className="cover-picker-title">chọn bìa</h2>

      <div className="cover-picker-layout">
        <div className="cover-sticker cover-sticker-left hidden md:grid">
          {PRODUCTS.map((p, i) => (
            <img
              key={p.stickerLeft}
              src={p.stickerLeft}
              alt=""
              aria-hidden
              loading="eager"
              className={cn(
                "cover-sticker-img h-auto w-full object-contain",
                i === selected && "active"
              )}
              style={{
                gridArea: "1/1",
                filter: "drop-shadow(2px 3px 8px rgba(0,0,0,0.14))",
                "--sticker-scale": p.mobileScale ?? 1,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="cover-picker-grid">
          {/* Showcase box with blur background effect */}
          <div className="cover-showcase-wrap">
          {/* Mobile: 3 cột — sticker căn giữa khoảng mép ↔ frame; desktop: ẩn slot */}
          <div className="cover-sticker-mobile-slot cover-sticker-mobile-slot--left md:hidden">
            <div className="cover-sticker-mobile-col" style={{ display: "grid" }}>
              {PRODUCTS.map((p, i) => (
                <img
                  key={`m-${p.stickerLeft}`}
                  src={p.stickerLeft}
                  alt=""
                  aria-hidden
                  loading="eager"
                  className={cn(
                    "cover-sticker-img h-auto w-full max-w-full object-contain",
                    i === selected && "active"
                  )}
                  style={{
                    gridArea: "1/1",
                    filter: "drop-shadow(2px 3px 8px rgba(0,0,0,0.14))",
                    "--sticker-scale": p.mobileScale ?? 1,
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
          <div className="cover-picker-showcase">
            <div className="cover-showcase-clip">
              {/* Placeholder when nothing selected */}
              <div
                className={cn(
                  "cover-showcase-placeholder",
                  hasSelection && "hidden"
                )}
              >
                <span className="cover-showcase-placeholder-icon cover-showcase-placeholder-icon--mobile">👇</span>
                <span className="cover-showcase-placeholder-icon cover-showcase-placeholder-icon--desktop">👉</span>
                <span className="cover-showcase-placeholder-text">
                  Chọn một mẫu bìa nha ^^
                </span>
              </div>

              {/* Blurred backgrounds */}
              <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: "inherit" }}>
                {PRODUCTS.map((p, i) => (
                  <img
                    key={`bg-${p.id}`}
                    src={p.coverImg}
                    alt=""
                    aria-hidden
                    loading="eager"
                    decoding="async"
                    fetchPriority={i === selected ? "high" : "low"}
                    className={cn(
                      "cover-showcase-bg",
                      i === selected && "active"
                    )}
                  />
                ))}
              </div>

              {/* Foreground product images */}
              {PRODUCTS.map((p, i) => (
                <img
                  key={`fg-${p.id}`}
                  src={p.coverImg}
                  alt={p.name}
                  loading="eager"
                  decoding="async"
                  fetchPriority={i === selected ? "high" : "low"}
                  className={cn(
                    "cover-showcase-img",
                    i === selected && "active"
                  )}
                  draggable={false}
                />
              ))}
            </div>
          </div>
          <div className="cover-sticker-mobile-slot cover-sticker-mobile-slot--right md:hidden">
            <div className="cover-sticker-mobile-col" style={{ display: "grid" }}>
              {PRODUCTS.map((p, i) => (
                <img
                  key={`m-${p.stickerRight}`}
                  src={p.stickerRight}
                  alt=""
                  aria-hidden
                  loading="eager"
                  className={cn(
                    "cover-sticker-img h-auto w-full max-w-full object-contain",
                    i === selected && "active"
                  )}
                  style={{
                    gridArea: "1/1",
                    filter: "drop-shadow(2px 3px 8px rgba(0,0,0,0.14))",
                    "--sticker-scale": p.mobileScale ?? 1,
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
          </div>

          <div className="cover-picker-options">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(i)}
                className={cn(
                  "cover-option",
                  i === selected && "active"
                )}
                style={
                  {
                    "--opt-color": p.color,
                    "--opt-bg": p.bgSelected,
                  } as React.CSSProperties
                }
              >
                <span className="cover-option-name">{p.name}</span>
                <span className="cover-option-desc">{p.desc}</span>
                <span className="cover-option-tick">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="cover-sticker cover-sticker-right hidden md:grid">
          {PRODUCTS.map((p, i) => (
            <img
              key={p.stickerRight}
              src={p.stickerRight}
              alt=""
              aria-hidden
              loading="eager"
              className={cn(
                "cover-sticker-img h-auto w-full object-contain",
                i === selected && "active"
              )}
              style={{
                gridArea: "1/1",
                filter: "drop-shadow(2px 3px 8px rgba(0,0,0,0.14))",
                "--sticker-scale": p.mobileScale ?? 1,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoverPickerSection;
