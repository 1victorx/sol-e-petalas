import { z } from "zod";
import { getRequestKey, takeRateLimit } from "@/lib/rate-limit";

const cepSchema = z.object({ cep: z.string().regex(/^\d{8}$/) });

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ error: "Use application/json." }, { status: 415 });
  }
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 2_048) {
    return Response.json({ error: "Corpo muito grande." }, { status: 413 });
  }

  const limit = takeRateLimit(getRequestKey(request, "cep"), {
    limit: 12,
    windowMs: 60_000,
  });
  if (!limit.allowed) {
    return Response.json(
      { error: "Muitas consultas. Aguarde antes de tentar novamente." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Solicitação inválida." }, { status: 400 });
  }

  const parsed = cepSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Informe um CEP com 8 dígitos." },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4_500);

  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${parsed.data.cep}/json/`,
      { signal: controller.signal, cache: "no-store" },
    );
    if (!response.ok) throw new Error("viacep-unavailable");

    const address = (await response.json()) as {
      erro?: boolean;
      localidade?: string;
      uf?: string;
      bairro?: string;
    };
    if (address.erro) {
      return Response.json({ error: "CEP não encontrado." }, { status: 404 });
    }

    return Response.json(
      {
        address: {
          city: address.localidade ?? "",
          state: address.uf ?? "",
          district: address.bairro ?? "",
        },
        shipping: [
          {
            id: "demo-economico",
            label: "Envio econômico — simulação",
            priceCents: 1890,
            estimate: "5 a 8 dias úteis (demonstrativo)",
          },
          {
            id: "demo-expresso",
            label: "Envio expresso — simulação",
            priceCents: 2990,
            estimate: "2 a 4 dias úteis (demonstrativo)",
          },
        ],
        simulation: true,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Não foi possível consultar o CEP agora." },
      { status: 503 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
