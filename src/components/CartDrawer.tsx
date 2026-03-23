import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { COVER_PRODUCTS } from "@/data/coverProducts";
import { buildPrefillUrl } from "@/constants/checkout";

function paperLabel(kind: "lined" | "grid"): string {
  return kind === "lined" ? "Giấy kẻ ngang" : "Giấy caro";
}

const CartDrawer = () => {
  const { orders, isCartOpen, closeCart, removeOrder, clearCart } = useCart();

  const handleOrder = () => {
    if (orders.length === 0) return;
    const url = buildPrefillUrl(orders);
    window.open(url, "_blank", "noopener,noreferrer");
    clearCart();
    closeCart();
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="flex h-[100dvh] max-h-[100dvh] min-h-0 w-full max-w-full flex-col gap-0 border-l-2 border-[#0a1560]/10 bg-[#f7f5f0] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:max-w-sm sm:p-6 sm:pb-6 sm:pt-6"
        style={{ fontFamily: "var(--font-main)" }}
      >
        <SheetHeader className="shrink-0 space-y-0 border-b border-[#0a1560]/10 pb-3 pr-10 text-left sm:pr-12">
          <SheetTitle
            className="text-xl leading-snug sm:text-2xl"
            style={{ fontFamily: "var(--font-main)", color: "#0a1560" }}
          >
            Giỏ hàng của bạn
          </SheetTitle>
          <SheetDescription className="sr-only">
            Danh sách sản phẩm bạn đã chọn
          </SheetDescription>
        </SheetHeader>

        {orders.length === 0 ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-1 py-6 text-center">
            <span className="text-5xl">🛒</span>
            <p className="text-lg" style={{ color: "hsl(220 20% 50%)" }}>
              Chưa có sản phẩm nào
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(220 15% 60%)" }}>
              Chọn bìa và ruột giấy rồi bấm &quot;Cùng tạo ngay&quot; để thêm vào giỏ
            </p>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-3 [-webkit-overflow-scrolling:touch]">
              <div className="flex flex-col gap-3">
                {orders.map((order, i) => {
                  const product = COVER_PRODUCTS[order.coverIndex];
                  if (!product) return null;
                  return (
                    <div
                      key={order.addedAt + "-" + i}
                      className="flex items-start gap-3 rounded-xl bg-white/80 p-3 shadow-sm"
                    >
                      <div
                        className="h-14 w-14 shrink-0 overflow-hidden rounded-lg sm:h-12 sm:w-12"
                        style={{ backgroundColor: product.bgSelected }}
                      >
                        <img
                          src={product.coverImg}
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-[15px] font-semibold leading-snug break-words sm:text-base"
                          style={{ color: product.color }}
                        >
                          {product.name}
                        </p>
                        <p
                          className="mt-0.5 text-sm leading-snug"
                          style={{ color: "hsl(220 15% 50%)" }}
                        >
                          {paperLabel(order.paper)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeOrder(i)}
                        className="mt-0.5 shrink-0 rounded-full p-2 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        aria-label={`Xoá ${product.name}`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 sm:h-4 sm:w-4"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="shrink-0 space-y-3 border-t border-[#0a1560]/10 pt-4">
              <div className="flex justify-between text-base">
                <span style={{ color: "hsl(220 15% 45%)" }}>Tổng</span>
                <span className="font-bold" style={{ color: "#0a1560" }}>
                  {orders.length} sản phẩm
                </span>
              </div>
              <button
                type="button"
                onClick={handleOrder}
                className="w-full rounded-xl py-3.5 text-lg font-bold text-white transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] sm:py-3"
                style={{ backgroundColor: "#0a1560" }}
              >
                Đặt hàng
              </button>
              <p
                className="text-center text-[11px] leading-snug sm:text-xs"
                style={{ color: "hsl(220 15% 60%)" }}
              >
                Bạn sẽ được chuyển sang form đặt hàng với thông tin đã điền sẵn
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
