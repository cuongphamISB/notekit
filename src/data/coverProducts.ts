export interface CoverProduct {
  id: string;
  name: string;
  desc: string;
  color: string;
  bgSelected: string;
  coverImg: string;
  stickerLeft: string;
  stickerRight: string;
  mobileScale?: number;
}

export const COVER_PRODUCTS: CoverProduct[] = [
  {
    id: "mkt",
    name: "Marketing",
    desc: "Viết insight khét, chốt camp mượt.",
    color: "#6078C0",
    bgSelected: "rgba(96,120,192,0.42)",
    coverImg: "/mkt (ko nhãn)_result.webp",
    stickerLeft: "/nam mkt.png",
    stickerRight: "/nữ mkt.png",
    mobileScale: 1.3,
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
    mobileScale: 0.897,
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
    mobileScale: 1.3,
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
    mobileScale: 1.3,
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
    mobileScale: 1.3,
  },
];

/** Màu option Accounting — đồng bộ accent UI (vd. thông báo CTA) */
export const ACCOUNTING_BOX_COLOR =
  COVER_PRODUCTS.find((p) => p.id === "acc")?.color ?? "#D48A3A";
