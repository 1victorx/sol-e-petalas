"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItemInput, CartLine } from "@/features/catalog/types";

type QuoteResponse = {
  lines: CartLine[];
  subtotalCents: number;
  adjusted: boolean;
};

type CartContextValue = {
  items: CartItemInput[];
  count: number;
  quote: QuoteResponse | null;
  loading: boolean;
  message: string;
  addItem: (item: CartItemInput) => Promise<boolean>;
  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number,
  ) => void;
  removeItem: (productId: string, variantId: string) => void;
  refreshQuote: () => Promise<QuoteResponse | null>;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sol-petalas-demo-cart-v1";

function normalize(items: CartItemInput[]) {
  const merged = new Map<string, CartItemInput>();
  for (const item of items) {
    const key = `${item.productId}:${item.variantId}`;
    const previous = merged.get(key);
    merged.set(key, {
      ...item,
      quantity: (previous?.quantity ?? 0) + item.quantity,
    });
  }
  return [...merged.values()];
}

async function requestQuote(items: CartItemInput[]) {
  const response = await fetch("/api/cart/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(items),
  });
  if (!response.ok) throw new Error("quote-failed");
  return (await response.json()) as QuoteResponse;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemInput[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setItems(JSON.parse(saved) as CartItemInput[]);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const refreshQuote = useCallback(async () => {
    setLoading(true);
    setMessage("");
    try {
      const nextQuote = await requestQuote(items);
      setQuote(nextQuote);
      if (nextQuote.adjusted) {
        const canonicalItems = nextQuote.lines.map(
          ({ productId, variantId, quantity }) => ({
            productId,
            variantId,
            quantity,
          }),
        );
        setItems(canonicalItems);
        setMessage("O carrinho foi ajustado conforme o estoque demonstrativo.");
      }
      return nextQuote;
    } catch {
      setMessage("Não foi possível validar o carrinho agora.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [items]);

  const addItem = useCallback(
    async (item: CartItemInput) => {
      setLoading(true);
      setMessage("");
      const proposed = normalize([...items, item]);
      try {
        const nextQuote = await requestQuote(proposed);
        const accepted = nextQuote.lines.some(
          (line) =>
            line.productId === item.productId &&
            line.variantId === item.variantId,
        );
        if (!accepted) {
          setMessage("Essa variação não está disponível.");
          return false;
        }
        setItems(
          nextQuote.lines.map(({ productId, variantId, quantity }) => ({
            productId,
            variantId,
            quantity,
          })),
        );
        setQuote(nextQuote);
        setMessage("Item adicionado ao carrinho demonstrativo.");
        return true;
      } catch {
        setMessage("Não foi possível validar o item agora.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [items],
  );

  const updateQuantity = useCallback(
    (productId: string, variantId: string, quantity: number) => {
      setItems((current) =>
        current.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity: Math.max(1, Math.min(10, quantity)) }
            : item,
        ),
      );
    },
    [],
  );

  const removeItem = useCallback((productId: string, variantId: string) => {
    setItems((current) =>
      current.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId),
      ),
    );
    setQuote(null);
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setQuote(null);
    setMessage("");
  }, []);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      quote,
      loading,
      message,
      addItem,
      updateQuantity,
      removeItem,
      refreshQuote,
      clearCart,
    }),
    [
      items,
      quote,
      loading,
      message,
      addItem,
      updateQuantity,
      removeItem,
      refreshQuote,
      clearCart,
    ],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
