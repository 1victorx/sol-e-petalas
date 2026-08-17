import { describe, expect, it } from "vitest";
import { formatBRL } from "./money";

describe("formatBRL", () => {
  it("formata centavos em real brasileiro", () => {
    expect(formatBRL(6990)).toMatch(/R\$\s69,90/);
  });
});
