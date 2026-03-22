import { useState } from "react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  desc: string;
  color: string;
  bgSelected: string;
  coverImg: string;
  stickerLeft: string;
  stickerRight: string;
}

const PRODUCTS: Product[] = [
  {
    id: "mkt",
    name: "Marketing",
    desc: "Viết insight khét, chốt camp mượt.",
    color: "#6078C0",
    bgSelected: "rgba(96,120,192,0.42)",
    coverImg: "/mkt (ko nhãn)_result.webp",
    stickerLeft: "/nam mkt.png",
    stickerRight: "/nữ mkt.png",
  },
  {
    id: "fin",
    name: "Finance",
    desc: "Flex nhẹ tư duy nghìn tỷ.",
    color: "#9370B8",
    bgSelected: "rgba(147,112,184,0.42)",
    coverImg: "/fin (ko nhãn)_result.webp",
    stickerLeft: "/nam fin.png",
    stickerRight: "/nữ fin.png",
  },
  {
    id: "ibu",
    name: "International Business",
    desc: "Hệ tư tưởng chốt deal toàn cầu.",
    color: "#4D8650",
    bgSelected: "rgba(77,134,80,0.42)",
    coverImg: "/ibu (ko nhãn)_result.webp",
    stickerLeft: "/nam ibu.png",
    stickerRight: "/nữ ibu.png",
  },
  {
    id: "acc",
    name: "Accounting",
    desc: "Trộm vía mọi con số đều cân.",
    color: "#D48A3A",
    bgSelected: "rgba(212,138,58,0.42)",
    coverImg: "/accounting (ko nhãn)_result.webp",
    stickerLeft: "/nam accounting.png",
    stickerRight: "/nữ accounting.png",
  },
  {
    id: "man",
    name: "Business Management",
    desc: "Sếp tương lai chuyên gánh team.",
    color: "#7B6BA8",
    bgSelected: "rgba(123,107,168,0.42)",
    coverImg: "/man (ko nhãn)_result.webp",
    stickerLeft: "/nam man.png",
    stickerRight: "/nữ man.png",
  },
];

const SECTION_STARS = [
  { src: "/sao xanh lam.png", style: { top: "4%", left: "7%", width: "clamp(22px,4.2vw,68px)" } },
  { src: "/sao vàng.png", style: { top: "2%", right: "8%", width: "clamp(26px,4.8vw,76px)" } },
  { src: "/sao xanh lam.png", style: { bottom: "12%", left: "4%", width: "clamp(20px,3.6vw,58px)" } },
  { src: "/sao màu hồng.png", style: { bottom: "6%", right: "46%", width: "clamp(20px,3.4vw,56px)" } },
  { src: "/sao tím đậm.png", style: { bottom: "5%", right: "6%", width: "clamp(22px,4vw,64px)" } },
];

const CoverPickerSection = () => {
  const [selected, setSelected] = useState(0);
  const product = PRODUCTS[selected];

  return (
    <section className="cover-picker" id="cover-picker">
      {SECTION_STARS.map((s, i) => (
        <div key={i} className="sticker-slot" style={s.style}>
          <img src={s.src} alt="" aria-hidden className="h-auto w-full object-contain" />
        </div>
      ))}

      <h2 className="cover-picker-title">chọn bìa</h2>

      <div className="cover-picker-layout">
        <div className="cover-sticker cover-sticker-left" style={{ display: "grid" }}>
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
              style={{ gridArea: "1/1", filter: "drop-shadow(2px 3px 8px rgba(0,0,0,0.14))" }}
            />
          ))}
        </div>

        <div className="cover-picker-grid">
          {/* Showcase box with blur background effect */}
          <div className="cover-showcase-wrap">
          <div className="cover-picker-showcase">
            {/* Blurred backgrounds */}
            <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: "inherit" }}>
              {PRODUCTS.map((p, i) => (
                <img
                  key={`bg-${p.id}`}
                  src={p.coverImg}
                  alt=""
                  aria-hidden
                  loading="eager"
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
                className={cn(
                  "cover-showcase-img",
                  i === selected && "active"
                )}
                draggable={false}
              />
            ))}
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

        <div className="cover-sticker cover-sticker-right" style={{ display: "grid" }}>
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
              style={{ gridArea: "1/1", filter: "drop-shadow(2px 3px 8px rgba(0,0,0,0.14))" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoverPickerSection;
