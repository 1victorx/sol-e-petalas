import { cartItemsSchema, quoteCart } from "@/features/cart/validation";
import { getRequestKey, takeRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ error: "Use application/json." }, { status: 415 });
  }
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 16_384) {
    return Response.json({ error: "Corpo muito grande." }, { status: 413 });
  }

  const limit = takeRateLimit(getRequestKey(request, "cart-quote"), {
    limit: 40,
    windowMs: 60_000,
  });
  if (!limit.allowed) {
    return Response.json(
      { error: "Muitas atualizações. Aguarde um momento." },
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
    return Response.json({ error: "Corpo inválido." }, { status: 400 });
  }

  const parsed = cartItemsSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Itens do carrinho inválidos." },
      { status: 400 },
    );
  }

  return Response.json(quoteCart(parsed.data), {
    headers: { "Cache-Control": "no-store" },
  });
}
