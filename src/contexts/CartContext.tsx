import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type PaperKind = "lined" | "grid";

export interface CartOrder {
  coverIndex: number;
  paper: PaperKind;
  addedAt: number;
}

interface CartContextType {
  cartCount: number;
  orders: CartOrder[];
  selectedCoverIndex: number;
  setSelectedCoverIndex: (index: number) => void;
  paperKind: PaperKind;
  setPaperKind: (kind: PaperKind) => void;
  /** Thêm đơn theo bìa + ruột giấy đang chọn (nút CTA cuối trang) */
  addCurrentOrderToCart: () => void;
  /** Giữ tương thích BuilderSection — cùng hành vi với addCurrentOrderToCart */
  addToCart: () => void;
  removeFromCart: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<CartOrder[]>([]);
  const [selectedCoverIndex, setSelectedCoverIndex] = useState(0);
  const [paperKind, setPaperKind] = useState<PaperKind>("lined");

  const addCurrentOrderToCart = useCallback(() => {
    setOrders((prev) => [
      ...prev,
      {
        coverIndex: selectedCoverIndex,
        paper: paperKind,
        addedAt: Date.now(),
      },
    ]);
  }, [selectedCoverIndex, paperKind]);

  const addToCart = addCurrentOrderToCart;

  const removeFromCart = useCallback(() => {
    setOrders((prev) => prev.slice(0, -1));
  }, []);

  const clearCart = useCallback(() => {
    setOrders([]);
  }, []);

  const value = useMemo(
    () => ({
      cartCount: orders.length,
      orders,
      selectedCoverIndex,
      setSelectedCoverIndex,
      paperKind,
      setPaperKind,
      addCurrentOrderToCart,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [
      orders,
      selectedCoverIndex,
      paperKind,
      addCurrentOrderToCart,
      addToCart,
      removeFromCart,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
