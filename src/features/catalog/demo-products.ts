import type { DemoProduct } from "./types";

const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const demoProducts: readonly DemoProduct[] = [
  {
    id: "demo-blush-rose",
    slug: "blush-cremoso-rose-demo",
    name: "Blush Cremoso Rosé",
    category: "maquiagem",
    categoryLabel: "Maquiagem",
    description:
      "Produto fictício criado exclusivamente para validar a experiência da loja.",
    details: [
      "Composição, peso e cuidados ainda aguardam dados oficiais.",
      "Imagem criada por IA para demonstração.",
    ],
    priceCents: 6990,
    image: `${assetPrefix}/products/blush-rose-demo.png`,
    imageAlt: "Blush compacto rosé demonstrativo sobre fundo marfim",
    maxPerOrder: 3,
    variants: [
      { id: "rose-sereno", name: "Rosé sereno", colorHex: "#b85e67", stock: 8 },
      { id: "terracota", name: "Terracota", colorHex: "#9d5645", stock: 3 },
    ],
  },
  {
    id: "demo-mascara-solar",
    slug: "mascara-cilios-solar-demo",
    name: "Máscara para Cílios Solar",
    category: "maquiagem",
    categoryLabel: "Maquiagem",
    description:
      "Produto fictício criado exclusivamente para validar a experiência da loja.",
    details: [
      "Fórmula, volume e modo de uso ainda aguardam dados oficiais.",
      "Imagem criada por IA para demonstração.",
    ],
    priceCents: 5490,
    image: `${assetPrefix}/products/mascara-solar-demo.png`,
    imageAlt: "Máscara para cílios demonstrativa preta com tampa açafrão",
    maxPerOrder: 4,
    variants: [{ id: "preto", name: "Preto", colorHex: "#171717", stock: 12 }],
  },
  {
    id: "demo-argolas-lume",
    slug: "argolas-lume-demo",
    name: "Argolas Lume",
    category: "acessorios",
    categoryLabel: "Acessórios",
    description:
      "Produto fictício criado exclusivamente para validar a experiência da loja.",
    details: [
      "Material, medidas e cuidados ainda aguardam dados oficiais.",
      "Imagem criada por IA para demonstração.",
    ],
    priceCents: 7990,
    image: `${assetPrefix}/products/argolas-lume-demo.png`,
    imageAlt: "Par de argolas douradas demonstrativas sobre fundo marfim",
    maxPerOrder: 2,
    variants: [
      { id: "dourado", name: "Dourado", colorHex: "#b68b30", stock: 5 },
    ],
  },
  {
    id: "demo-necessaire-bosque",
    slug: "necessaire-bosque-demo",
    name: "Nécessaire Bosque",
    category: "acessorios",
    categoryLabel: "Acessórios",
    description:
      "Produto fictício criado exclusivamente para validar a experiência da loja.",
    details: [
      "Material, medidas e cuidados ainda aguardam dados oficiais.",
      "Imagem criada por IA para demonstração.",
    ],
    priceCents: 8990,
    image: `${assetPrefix}/products/necessaire-bosque-demo.png`,
    imageAlt: "Nécessaire verde-floresta demonstrativa sobre fundo marfim",
    maxPerOrder: 2,
    variants: [
      {
        id: "verde-bosque",
        name: "Verde bosque",
        colorHex: "#23483a",
        stock: 4,
      },
      { id: "rosa-petala", name: "Rosa pétala", colorHex: "#b76e72", stock: 0 },
    ],
  },
] as const;

export function getProductBySlug(slug: string) {
  return demoProducts.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return demoProducts.find((product) => product.id === id);
}
