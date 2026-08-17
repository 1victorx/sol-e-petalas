"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/cart-provider";

export function QuickAddButton({
  productId,
  variantId,
}: {
  productId: string;
  variantId: string;
}) {
  const { addItem, loading } = useCart();
  return (
    <Button
      aria-label="Adicionar ao carrinho demonstrativo"
      className="quick-add"
      loading={loading}
      onClick={() => void addItem({ productId, variantId, quantity: 1 })}
      size="icon-xl"
      title="Adicionar ao carrinho"
    >
      <ShoppingBag aria-hidden="true" />
    </Button>
  );
}
