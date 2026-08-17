import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
});

test("filtra o catálogo e mostra estado vazio de busca", async ({ page }) => {
  await page.goto("/catalogo");
  await expect(
    page.getByRole("heading", { name: "Escolhas para experimentar" }),
  ).toBeVisible();
  await page.getByLabel("Buscar no catálogo").fill("produto inexistente");
  await page.getByRole("button", { name: "Aplicar" }).click();
  await expect(
    page.getByRole("heading", { name: "Nenhum item encontrado" }),
  ).toBeVisible();
});

test("seleciona variação, adiciona e revalida o carrinho", async ({ page }) => {
  await page.goto("/produto/blush-cremoso-rose-demo");
  await page.getByRole("button", { name: "Terracota" }).click();
  await page
    .getByRole("button", { name: "Adicionar ao carrinho", exact: true })
    .click();
  await expect(
    page.getByText("Item adicionado ao carrinho demonstrativo."),
  ).toBeVisible();
  await page.getByRole("link", { name: /Carrinho com 1 item/ }).click();
  await expect(
    page.getByRole("heading", { name: "Seu carrinho" }),
  ).toBeVisible();
  await expect(
    page.getByText("R$ 69,90", { exact: true }).first(),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByText("Variação: Terracota")).toBeVisible();
});

test("checkout permanece bloqueado e não coleta cartão", async ({ page }) => {
  await page.goto("/produto/mascara-cilios-solar-demo");
  await page
    .getByRole("button", { name: "Adicionar ao carrinho", exact: true })
    .click();
  await page.goto("/checkout");
  await expect(page.getByText("Nenhuma cobrança será feita")).toBeVisible();
  await expect(page.locator('input[type="text"]')).toHaveCount(0);
  await expect(page.getByText("Checkout hospedado futuro")).toBeVisible();
});

test("não cria avaliações fictícias", async ({ page }) => {
  await page.goto("/produto/argolas-lume-demo");
  await page.getByText("Avaliações", { exact: true }).click();
  await expect(
    page.getByText(
      "Ainda não existem avaliações. Nenhuma avaliação fictícia foi criada.",
    ),
  ).toBeVisible();
});
