export interface StickerProduct {
  id: string;
  name: string;
  /** Accent color for the selection box border / tick */
  color: string;
  /** Translucent version of color for selected background */
  bgSelected: string;
  /** Path inside /public */
  stickerImg: string;
}

export const STICKER_PRODUCTS: StickerProduct[] = [
  {
    id: "mkt",
    name: "Marketing",
    color: "#9B85CC",
    bgSelected: "rgba(155,133,204,0.15)",
    stickerImg: "/mkt.webp",
  },
  {
    id: "fin",
    name: "Finance",
    color: "#6A88BE",
    bgSelected: "rgba(106,136,190,0.15)",
    stickerImg: "/fin.webp",
  },
  {
    id: "ibu",
    name: "International Business",
    color: "#4D8A82",
    bgSelected: "rgba(77,138,130,0.15)",
    stickerImg: "/ibu.webp",
  },
  {
    id: "acc",
    name: "Accounting",
    color: "#C4784A",
    bgSelected: "rgba(196,120,74,0.15)",
    stickerImg: "/accounting.webp",
  },
  {
    id: "bm",
    name: "Business Management",
    color: "#B86878",
    bgSelected: "rgba(184,104,120,0.15)",
    stickerImg: "/BM.webp",
  },
];

