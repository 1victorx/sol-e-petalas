import { describe, expect, it } from "vitest";
import { cartItemsSchema, quoteCart } from "./validation";

describe("cartItemsSchema", () => {
  it("rejeita quantidade negativa", () => {
    expect(
      cartItemsSchema.safeParse([
        {
          productId: "demo-blush-rose",
          variantId: "rose-sereno",
          quantity: -1,
        },
      ]).success,
    ).toBe(false);
  });
});

describe("quoteCart", () => {
  it("usa o preço canônico e limita a quantidade no servidor", () => {
    const quote = quoteCart([
      { productId: "demo-blush-rose", variantId: "terracota", quantity: 9 },
    ]);
    expect(quote.adjusted).toBe(true);
    expect(quote.lines[0]).toMatchObject({ quantity: 3, unitPriceCents: 6990 });
    expect(quote.subtotalCents).toBe(20_970);
  });

  it("remove variação indisponível", () => {
    const quote = quoteCart([
      {
        productId: "demo-necessaire-bosque",
        variantId: "rosa-petala",
        quantity: 1,
      },
    ]);
    expect(quote.adjusted).toBe(true);
    expect(quote.lines).toHaveLength(0);
  });

  it("agrega linhas duplicadas antes de aplicar estoque e limite", () => {
    const quote = quoteCart([
      { productId: "demo-blush-rose", variantId: "rose-sereno", quantity: 2 },
      { productId: "demo-blush-rose", variantId: "rose-sereno", quantity: 2 },
    ]);
    expect(quote.adjusted).toBe(true);
    expect(quote.lines).toHaveLength(1);
    expect(quote.lines[0]?.quantity).toBe(3);
    expect(quote.subtotalCents).toBe(20_970);
  });
});
