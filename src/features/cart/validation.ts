import { z } from "zod";
import { getProductById } from "@/features/catalog/demo-products";
import type { CartItemInput, CartLine } from "@/features/catalog/types";

export const cartItemsSchema = z
  .array(
    z.object({
      productId: z.string().min(1).max(80),
      variantId: z.string().min(1).max(80),
      quantity: z.number().int().min(1).max(10),
    }),
  )
  .max(30);

export type QuoteResult = {
  lines: CartLine[];
  subtotalCents: number;
  adjusted: boolean;
};

export function quoteCart(items: CartItemInput[]): QuoteResult {
  let adjusted = false;
  const lines: CartLine[] = [];
  const aggregated = new Map<string, CartItemInput>();

  for (const item of items) {
    const key = `${item.productId}:${item.variantId}`;
    const previous = aggregated.get(key);
    if (previous) adjusted = true;
    aggregated.set(key, {
      productId: item.productId,
      variantId: item.variantId,
      quantity: (previous?.quantity ?? 0) + item.quantity,
    });
  }

  for (const item of aggregated.values()) {
    const product = getProductById(item.productId);
    const variant = product?.variants.find(
      (entry) => entry.id === item.variantId,
    );

    if (!product || !variant || variant.stock < 1) {
      adjusted = true;
      continue;
    }

    const quantity = Math.min(
      item.quantity,
      product.maxPerOrder,
      variant.stock,
    );
    if (quantity !== item.quantity) adjusted = true;

    lines.push({
      ...item,
      quantity,
      name: product.name,
      slug: product.slug,
      variantName: variant.name,
      image: product.image,
      unitPriceCents: product.priceCents,
      lineTotalCents: product.priceCents * quantity,
      availableStock: variant.stock,
    });
  }

  return {
    lines,
    subtotalCents: lines.reduce(
      (total, line) => total + line.lineTotalCents,
      0,
    ),
    adjusted,
  };
}
