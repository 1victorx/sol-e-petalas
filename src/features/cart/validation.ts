import { z } from "zod";

export const cartItemsSchema = z
  .array(
    z.object({
      productId: z.string().min(1).max(80),
      variantId: z.string().min(1).max(80),
      quantity: z.number().int().min(1).max(10),
    }),
  )
  .max(30);
