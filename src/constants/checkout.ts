import { COVER_PRODUCTS } from "@/data/coverProducts";
import type { CartOrder, PaperKind } from "@/contexts/CartContext";

export const GOOGLE_FORM_BASE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSczry1upzRGxLWrxG3kY4nRyB7MHXRRxt_iRvi4hffNVCPImw/viewform";

/** Kept for any legacy references */
export const GOOGLE_FORM_ORDER_VIEW_URL = GOOGLE_FORM_BASE_URL;

/**
 * Số cặp entry trên form (15). Logic tam giác: SL=n dùng n cặp bắt đầu tại index n(n-1)/2
 * → tối đa SL=5 vừa đủ 15 cặp (1+2+3+4+5). SL>5 cần thêm cặp trên Google Form.
 */
export const MAX_NOTEBOOK_FORM_SLOTS = 15;

const ENTRY_QUANTITY = "entry.545313271";

/**
 * Cặp entry theo thứ tự trên form (bìa → ruột).
 * Form nhánh theo SL: mỗi mức n có block riêng — block n bắt sau 1+2+…+(n-1) cặp (offset tam giác).
 */
const NOTEBOOK_SLOT_ENTRIES: ReadonlyArray<{ cover: string; paper: string }> = [
  { cover: "entry.1325401111", paper: "entry.1986163141" },
  { cover: "entry.2036737127", paper: "entry.2000135459" },
  { cover: "entry.1191383679", paper: "entry.1581717088" },
  { cover: "entry.1174133390", paper: "entry.1624280038" },
  { cover: "entry.1047202024", paper: "entry.215440533" },
  { cover: "entry.583852087", paper: "entry.965391385" },
  { cover: "entry.931983033", paper: "entry.646867365" },
  { cover: "entry.1812689296", paper: "entry.1096868052" },
  { cover: "entry.1019614602", paper: "entry.1846255240" },
  { cover: "entry.1430102429", paper: "entry.59692017" },
  { cover: "entry.1711712584", paper: "entry.452283712" },
  { cover: "entry.883195930", paper: "entry.1576995984" },
  { cover: "entry.271036176", paper: "entry.1037383309" },
  { cover: "entry.961905376", paper: "entry.1404423936" },
  { cover: "entry.1454433854", paper: "entry.543116197" },
];

function paperLabel(kind: PaperKind): string {
  return kind === "lined" ? "Giấy kẻ ngang" : "Giấy caro";
}

function coverName(index: number): string {
  return COVER_PRODUCTS[index]?.name ?? `Bìa #${index + 1}`;
}

/**
 * Offset cặp cho nhánh “đúng SL”: SL=1 → [0], SL=2 → [1,2], SL=3 → [3,4,5], SL=4 → [6..9], …
 * Tổng cặp tới hết nhánh n là n(n+1)/2.
 */
function slotPairsForCartSize(cartSize: number): ReadonlyArray<{ cover: string; paper: string }> {
  if (cartSize <= 0) return [];
  const start = (cartSize * (cartSize - 1)) / 2;
  const end = start + cartSize;
  if (end <= NOTEBOOK_SLOT_ENTRIES.length) {
    return NOTEBOOK_SLOT_ENTRIES.slice(start, end);
  }
  /* Thiếu entry (vd. SL>5 với 15 cặp): gửi phần còn lại từ offset — có thể không đủ ô trên form */
  if (start < NOTEBOOK_SLOT_ENTRIES.length) {
    return NOTEBOOK_SLOT_ENTRIES.slice(start, NOTEBOOK_SLOT_ENTRIES.length);
  }
  return [];
}

/**
 * Prefill: số lượng sổ + từng cặp bìa/ruột theo thứ tự trong giỏ.
 * Nếu giỏ > {@link MAX_NOTEBOOK_FORM_SLOTS}, chỉ các dòng đầu được gửi (cần thêm entry trên form nếu muốn đủ).
 */
export function buildPrefillUrl(orders: CartOrder[]): string {
  if (orders.length === 0) return GOOGLE_FORM_BASE_URL;

  const params = new URLSearchParams({ usp: "pp_url" });

  params.set(ENTRY_QUANTITY, String(orders.length));

  const rows = slotPairsForCartSize(orders.length);
  const limit = Math.min(orders.length, rows.length);
  for (let i = 0; i < limit; i++) {
    const o = orders[i]!;
    const slot = rows[i]!;
    params.set(slot.cover, coverName(o.coverIndex));
    params.set(slot.paper, paperLabel(o.paper));
  }

  return `${GOOGLE_FORM_BASE_URL}?${params.toString()}`;
}
