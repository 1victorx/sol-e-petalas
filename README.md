# SOL & PETALAS

MVP demonstrativo de uma loja de maquiagens e acessórios femininos. O projeto tem personalidade visual própria, usa a combinação aprovada do monograma S/P com marfim, verde-floresta, rosa-pétala e açafrão, e não realiza vendas reais.

> Todos os produtos, imagens, preços, estoques, fretes e pedidos atuais são dados de demonstração. As imagens foram geradas por IA para este protótipo.

## Escopo

### MVP implementado

- home responsiva e catálogo com busca, categoria e estado vazio;
- cards com imagem otimizada, estoque, variação e adição rápida quando possível;
- página de produto com ampliação, variações nomeadas, quantidade, compartilhamento e avaliações vazias;
- ViaCEP no servidor com máscara, validação, timeout, rate limit e estados de erro;
- modalidades de frete explicitamente simuladas;
- carrinho persistido localmente apenas com IDs/quantidades e revalidado no servidor;
- checkout demonstrativo bloqueado, sem captura de cartão ou dados pessoais;
- lint, TypeScript estrito, Vitest, Playwright, CI e headers de segurança.

### Próximas melhorias

- catálogo oficial e roupas femininas;
- Supabase/PostgreSQL com RLS e painel administrativo MFA/RBAC;
- Melhor Envio após CEP de origem, pesos, dimensões e embalagens;
- Mercado Pago Checkout Pro em sandbox, com webhooks assinados e idempotência;
- políticas, dados empresariais, regras de parcelas/juros e WhatsApp oficial;
- avaliações moderadas de compras verificadas e emissão fiscal.

### Fora do escopo atual

Pagamento real, pedido real, autenticação, coleta de dados pessoais, cálculo logístico real, publicação em produção e promessas comerciais.

## Sitemap

- `/` — apresentação
- `/catalogo` — catálogo e filtros
- `/produto/[slug]` — produto, variação, CEP e compartilhamento
- `/carrinho` — revisão e revalidação
- `/checkout` — demonstração bloqueada
- `/sobre` — contexto e pendências
- `/conta` — estado indisponível

Jornada principal: home → catálogo → produto/variação → carrinho → checkout demonstrativo. Jornadas secundárias: busca sem resultado, variação indisponível, CEP inválido/indisponível, carrinho vazio, compartilhamento e ausência de avaliações.

## Arquitetura

Next.js App Router, React, TypeScript estrito e Tailwind CSS v4. As rotas são Server Components por padrão; componentes interativos ficam por domínio em `src/features`. Dados demonstrativos e validação canônica permanecem no servidor. Rotas `POST` validam contratos Zod e nunca aceitam preço do navegador.

Os componentes Button, Badge e Spinner vieram seletivamente do registro COSS UI, adaptados aos tokens da marca. A versão usada depende de `@base-ui/react` 1.7.0. O diretório de UI do COSS é MIT, enquanto o monorepo contém outras áreas AGPL; por isso apenas arquivos do registro de UI foram incorporados.

## Desenvolvimento

Requisitos: Node.js 24+ e pnpm 11.22+.

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm exec playwright install chromium
pnpm test:e2e
pnpm build
```

Copie `.env.example` para `.env.local` apenas quando necessário. Segredos devem ser cadastrados no cofre do provedor, nunca no Git ou no frontend.

## Variáveis futuras

- `NEXT_PUBLIC_SITE_URL`: URL canônica pública;
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`;
- `MERCADO_PAGO_ACCESS_TOKEN`;
- `MELHOR_ENVIO_ACCESS_TOKEN`;
- `WHATSAPP_DESTINATION_NUMBER`.

Nenhuma integração futura é ativada pela mera presença dessas variáveis; adaptadores de produção ainda precisam ser implementados e auditados.

## Riscos e decisões pendentes

- “Grátis” significa ausência de mensalidade em alguns serviços, não ausência de tarifa por pagamento ou frete.
- Vercel Hobby não é indicado para e-commerce comercial; o ambiente de produção exigirá plano/licença compatível.
- BACEN não fornece uma tabela universal de parcelamento. É preciso aprovar quantidade máxima, parcela mínima, juros, arredondamento e responsável pelo custo.
- O carrinho local é adequado ao protótipo, mas pedidos/estoque exigem banco transacional.
- ViaCEP pode ficar indisponível ou limitar uso abusivo; endereço não equivale a cálculo de frete.

## Publicação

O projeto está preparado para Vercel, mas a implantação em produção está proibida nesta fase. Antes de publicar: substituir dados demonstrativos, aprovar políticas, configurar banco/provedores, executar testes de segurança e definir o plano de hospedagem comercial.
