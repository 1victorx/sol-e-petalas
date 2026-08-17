"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";

export function CartLink() {
  const { count } = useCart();
  return (
    <Link
      aria-label={`Carrinho com ${count} ${count === 1 ? "item" : "itens"}`}
      href="/carrinho"
    >
      <ShoppingBag aria-hidden="true" />
      <span className="cart-count" aria-hidden="true">
        {count}
      </span>
    </Link>
  );
}
