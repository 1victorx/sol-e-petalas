# Segurança

Este repositório é uma demonstração e não deve processar pedidos ou pagamentos reais.

A prévia do GitHub Pages é estática: não oferece as garantias das rotas de servidor e não deve ser tratada como ambiente comercial.

## Relato de vulnerabilidades

Não publique detalhes exploráveis em uma issue pública. Use o canal privado de segurança do GitHub após sua ativação pelo proprietário do repositório.

## Barreiras atuais

- checkout sem campos de cartão e sem chamada ao provedor;
- catálogo e frete marcados como demonstração;
- preço, limite e estoque recalculados no servidor;
- validação de entrada, timeout e rate limit nas rotas sensíveis;
- CSP e headers defensivos;
- `robots` com `noindex, nofollow`;
- nenhuma credencial real no código ou no `.env.example`.

## Bloqueadores para produção

Supabase com RLS, autenticação administrativa com MFA/RBAC, persistência transacional, idempotência, webhook assinado, reserva concorrente de estoque, políticas LGPD aprovadas, regras comerciais, dados empresariais, testes de autorização e varredura de segredos no histórico.
