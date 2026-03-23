import { COVER_PRODUCTS } from "@/data/coverProducts";
import type { CartOrder, PaperKind } from "@/contexts/CartContext";

export const GOOGLE_FORM_BASE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSczry1upzRGxLWrxG3kY4nRyB7MHXRRxt_iRvi4hffNVCPImw/viewform";

/** Kept for any legacy references */
export const GOOGLE_FORM_ORDER_VIEW_URL = GOOGLE_FORM_BASE_URL;

const ENTRY = {
  cover: "entry.820602519",
  paper: "entry.1314084442",
  quantity: "entry.3804287",
  notes: "entry.434020250",
} as const;

function paperLabel(kind: PaperKind): string {
  return kind === "lined" ? "Giấy kẻ ngang" : "Giấy caro";
}

function coverName(index: number): string {
  return COVER_PRODUCTS[index]?.name ?? `Bìa #${index + 1}`;
}

export function buildPrefillUrl(orders: CartOrder[]): string {
  if (orders.length === 0) return GOOGLE_FORM_BASE_URL;

  const params = new URLSearchParams({ usp: "pp_url" });

  const grouped = new Map<string, { paper: string; count: number }>();
  for (const o of orders) {
    const key = `${o.coverIndex}|${o.paper}`;
    const existing = grouped.get(key);
    if (existing) {
      existing.count++;
    } else {
      grouped.set(key, { paper: o.paper, count: 1 });
    }
  }

  const entries = [...grouped.entries()];
  const totalQty = orders.length;

  if (entries.length === 1) {
    const [key, val] = entries[0];
    const coverIdx = Number(key.split("|")[0]);
    params.set(ENTRY.cover, coverName(coverIdx));
    params.set(ENTRY.paper, paperLabel(val.paper));
    params.set(ENTRY.quantity, String(val.count));
  } else {
    const coverNames = entries.map(([key]) => coverName(Number(key.split("|")[0])));
    params.set(ENTRY.cover, coverNames.join(", "));
    params.set(ENTRY.quantity, String(totalQty));

    const paperTypes = [...new Set(entries.map(([, v]) => paperLabel(v.paper)))];
    params.set(ENTRY.paper, paperTypes.join(", "));

    const breakdown = entries
      .map(([key, val]) => {
        const coverIdx = Number(key.split("|")[0]);
        return `${coverName(coverIdx)} - ${paperLabel(val.paper)} x${val.count}`;
      })
      .join("; ");
    params.set(ENTRY.notes, `Chi tiết đơn: ${breakdown}`);
  }

  return `${GOOGLE_FORM_BASE_URL}?${params.toString()}`;
}
