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
  selectedCoverIndex: number | null;
  setSelectedCoverIndex: (index: number) => void;
  paperKind: PaperKind;
  setPaperKind: (kind: PaperKind) => void;
  addCurrentOrderToCart: () => void;
  addToCart: () => void;
  removeOrder: (index: number) => void;
  removeFromCart: () => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<CartOrder[]>([]);
  const [selectedCoverIndex, setSelectedCoverIndex] = useState<number | null>(null);
  const [paperKind, setPaperKind] = useState<PaperKind>("lined");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addCurrentOrderToCart = useCallback(() => {
    if (selectedCoverIndex === null) return;
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

  const removeOrder = useCallback((index: number) => {
    setOrders((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const removeFromCart = useCallback(() => {
    setOrders((prev) => prev.slice(0, -1));
  }, []);

  const clearCart = useCallback(() => {
    setOrders([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((p) => !p), []);

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
      removeOrder,
      removeFromCart,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      orders,
      selectedCoverIndex,
      paperKind,
      addCurrentOrderToCart,
      addToCart,
      removeOrder,
      removeFromCart,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
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
