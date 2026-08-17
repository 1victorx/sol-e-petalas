export type ProductCategory = "maquiagem" | "acessorios";

export type ProductVariant = {
  id: string;
  name: string;
  colorHex?: string;
  stock: number;
};

export type DemoProduct = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  details: string[];
  priceCents: number;
  image: string;
  imageAlt: string;
  maxPerOrder: number;
  variants: ProductVariant[];
};

export type CartItemInput = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type CartLine = CartItemInput & {
  name: string;
  slug: string;
  variantName: string;
  image: string;
  unitPriceCents: number;
  lineTotalCents: number;
  availableStock: number;
};
