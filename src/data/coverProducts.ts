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
    color: "#9B85CC",
    bgSelected: "rgba(155,133,204,0.42)",
    coverImg: "/mkt_result.webp",
    stickerLeft: "/nam mkt.webp",
    stickerRight: "/nữ mkt.webp",
    mobileScale: 1.3,
  },
  {
    id: "fin",
    name: "Finance",
    desc: "Flex nhẹ tư duy nghìn tỷ.",
    color: "#6A88BE",
    bgSelected: "rgba(106,136,190,0.42)",
    coverImg: "/fin_result.webp",
    stickerLeft: "/nam fin.webp",
    stickerRight: "/nữ fin.webp",
    mobileScale: 0.897,
  },
  {
    id: "ibu",
    name: "International Business",
    desc: "Hệ tư tưởng chốt deal toàn cầu.",
    color: "#4D8A82",
    bgSelected: "rgba(77,138,130,0.42)",
    coverImg: "/ibu_result.webp",
    stickerLeft: "/nam ibu.webp",
    stickerRight: "/nữ ibu.webp",
    mobileScale: 1.3,
  },
  {
    id: "acc",
    name: "Accounting",
    desc: "Trộm vía mọi con số đều cân.",
    color: "#C4784A",
    bgSelected: "rgba(196,120,74,0.42)",
    coverImg: "/accounting_result.webp",
    stickerLeft: "/nam accounting.webp",
    stickerRight: "/nữ accounting.webp",
    mobileScale: 1.3,
  },
  {
    id: "man",
    name: "Business Management",
    desc: "Sếp tương lai chuyên gánh team.",
    color: "#B86878",
    bgSelected: "rgba(184,104,120,0.42)",
    coverImg: "/man_result.webp",
    stickerLeft: "/nam man.webp",
    stickerRight: "/nữ man.webp",
    mobileScale: 1.3,
  },
];


/** Màu option Accounting — đồng bộ accent UI (vd. thông báo CTA) */
export const ACCOUNTING_BOX_COLOR =
  COVER_PRODUCTS.find((p) => p.id === "acc")?.color ?? "#D48A3A";
