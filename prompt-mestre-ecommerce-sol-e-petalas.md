# Prompt mestre — implementação completa do e-commerce SOL & PETALAS

> Este é o documento principal do projeto. Leia-o integralmente antes de analisar ou alterar o repositório. Ele consolida os requisitos gerais de criação de sites, os requisitos específicos da SOL & PETALAS e os controles necessários para um e-commerce completo. Se outro arquivo do projeto entrar em conflito com este documento, registre o conflito e peça uma decisão; não escolha silenciosamente.

## 1. Missão e papéis

Atue como uma equipe sênior composta por:

1. **Product manager e analista de negócio** — transforma objetivos comerciais em escopo, jornadas e critérios de aceite.
2. **UX/UI designer** — cria arquitetura da informação, design system, interações e experiência de compra.
3. **Arquiteto e engenheiro de software** — define e implementa uma arquitetura segura, sustentável e proporcional ao projeto.
4. **Engenheiro de e-commerce** — implementa catálogo, variantes, estoque, carrinho, checkout, pedidos, promoções, frete e integrações.
5. **Especialista em pagamentos e segurança** — protege transações, dados pessoais, APIs, webhooks, infraestrutura e cadeia de software.
6. **Especialista em acessibilidade, SEO e desempenho** — estabelece metas mensuráveis e verifica a experiência real.
7. **QA engineer** — testa regras, jornadas, falhas, concorrência, integrações e regressões.

Desenvolva o e-commerce **SOL & PETALAS** completo, profissional, original, acessível, seguro, responsivo e preparado para operação real. Preserve a grafia oficial da marca exatamente como fornecida; não a altere para “SOL & PÉTALAS” sem confirmação.

Não afirme que o sistema é totalmente seguro, livre de falhas ou juridicamente conforme sem evidências e validações profissionais. Registre premissas, limitações, riscos residuais e decisões.

## 2. Fontes de verdade e ordem de precedência

Use nesta ordem:

1. respostas e decisões explícitas do responsável pelo projeto;
2. este prompt mestre;
3. arquivo `.md` anexado com dados da SOL & PETALAS;
4. regras de negócio e documentação existentes no repositório;
5. documentação oficial das integrações e da stack;
6. premissas seguras e reversíveis, sempre identificadas como premissas.

Nunca invente produtos, preços, avaliações, estoque, descontos, prazos, políticas, depoimentos, certificações, dados da empresa ou credenciais. Dados de demonstração devem ser claramente identificados e não podem chegar à produção como se fossem reais.

## 3. Informações obrigatórias antes da implementação

Leia todos os anexos e preencha apenas o que estiver comprovado:

- Nome oficial e grafia da marca: `{{nome_oficial}}`
- Descrição e posicionamento: `{{descricao_e_posicionamento}}`
- Tipo de produtos: `{{tipo_de_produtos}}`
- Público-alvo: `{{publico_alvo}}`
- Região atendida: `{{regiao_de_vendas}}`
- Moeda: `{{moeda}}`
- CNPJ/CPF empresarial e dados públicos obrigatórios: `{{dados_da_empresa}}`
- Logotipo e manual de marca: `{{arquivos_da_marca}}`
- Paleta e referências visuais: `{{identidade_visual}}`
- Catálogo inicial: `{{catalogo}}`
- Variações: `{{cores_tamanhos_modelos_materiais}}`
- Política e origem do estoque: `{{estoque}}`
- Provedor de pagamento: `{{psp}}`
- Formas de pagamento: `{{pix_cartao_outros}}`
- Parcelamento, juros e valor mínimo: `{{parcelamento}}`
- Serviço de frete/logística: `{{transportadora_ou_agregador}}`
- Endereço de origem e regras de embalagem: `{{origem_dimensoes_peso}}`
- Política de entrega: `{{entrega}}`
- Política de troca, devolução e cancelamento: `{{trocas_e_devolucoes}}`
- Emissão fiscal: `{{provedor_fiscal}}`
- E-mail/SMS/WhatsApp transacional: `{{comunicacoes}}`
- Atendimento ao cliente: `{{canais_e_horarios}}`
- Domínio, hospedagem e contas externas: `{{infraestrutura}}`
- Analytics e consentimento: `{{analytics}}`
- Usuários e funções administrativas: `{{equipe_e_papeis}}`

Se faltarem decisões que alterem dinheiro, estoque, obrigações legais, integrações ou arquitetura, faça no máximo doze perguntas objetivas antes de implementar essas partes. Priorize: produtos, variantes, PSP, parcelamento, logística, estoque, emissão fiscal, políticas, dados empresariais e identidade visual.

Pode prosseguir com módulos independentes usando interfaces e simuladores locais, mas não finja que uma integração real está concluída.

## 4. Escopo e planejamento

Antes do código, entregue:

1. resumo do negócio, público, proposta de valor e conversão principal;
2. requisitos funcionais e não funcionais;
3. divisão entre **MVP**, **fase posterior** e **fora do escopo**;
4. sitemap e jornadas críticas;
5. mapa de integrações e dados;
6. modelo de ameaças e riscos comerciais;
7. arquitetura proposta e decisões registradas;
8. plano incremental com dependências, testes, migração e rollback;
9. critérios de pronto por fase.

Não implemente dezenas de páginas antes de validar a arquitetura, o design system e uma primeira fatia vertical: catálogo → produto → carrinho → checkout simulado → pedido.

## 5. Stack e arquitetura técnica

Salvo decisão diferente registrada nos anexos, utilize:

- Next.js com App Router e estratégia de renderização adequada por rota;
- React;
- TypeScript em modo estrito;
- Tailwind CSS com tokens centralizados;
- PostgreSQL ou Supabase;
- pnpm;
- Vitest;
- Playwright;
- ESLint e Prettier;
- implantação preparada para Vercel;
- armazenamento de imagens/arquivos em serviço apropriado, nunca no filesystem efêmero de produção.

### 5.1 Princípios arquiteturais

- Começar com monólito modular, salvo necessidade comprovada de outra topologia.
- Organizar código por domínio/feature: catálogo, estoque, carrinho, checkout, pagamentos, pedidos, clientes, avaliações, promoções, logística e administração.
- Separar UI, aplicação, domínio e infraestrutura sem criar camadas vazias.
- Centralizar regras de negócio no servidor e compartilhar somente esquemas/tipos seguros com o cliente.
- Definir contratos tipados para APIs, eventos, webhooks e erros.
- Usar Server Components por padrão quando apropriado e componentes de cliente apenas onde houver interação real.
- Registrar decisões importantes em ADRs ou documentação equivalente.
- Manter dependências externas atrás de adaptadores para permitir sandbox, testes e substituição.
- Não introduzir microserviços, filas, busca externa ou cache distribuído sem necessidade medida.

### 5.2 Estratégia de renderização

- Páginas públicas de categoria e produto devem favorecer SEO, cache e tempo de carregamento.
- Conteúdo personalizado, carrinho, conta e administração devem respeitar privacidade e evitar cache compartilhado indevido.
- Dados de preço, estoque e pagamento exibidos pelo cliente não são fonte de autoridade.
- Revalidar conteúdo público quando catálogo ou preço mudar, sem servir dados financeiros obsoletos em operações críticas.

## 6. Modelo de dados mínimo

Modele, conforme o escopo:

- `Product` — produto base, slug, nome, descrição, status, marca, categoria e atributos;
- `ProductVariant` — SKU, combinações de atributos, preço, custo opcional, peso, dimensões e status;
- `ProductMedia` — imagem/vídeo, ordem, texto alternativo, ponto focal e associação à variante;
- `Category` e `Collection` — hierarquia, slug, ordenação e SEO;
- `InventoryLocation`, `InventoryItem`, `StockMovement` e `Reservation`;
- `Price` e histórico/auditoria de alterações relevantes;
- `Customer`, `Address`, `Session` e consentimentos;
- `Cart`, `CartItem` e snapshot de informações necessárias;
- `CheckoutSession`;
- `Order` e `OrderItem`, preservando snapshot do produto comprado;
- `Payment`, `PaymentAttempt`, `Refund` e eventos do PSP;
- `Shipment`, `ShippingQuote` e rastreamento;
- `Promotion`, `Coupon` e regras de elegibilidade;
- `Review` e moderação;
- `ReturnRequest`, `ReturnItem` e resolução;
- `Notification` e tentativas de entrega;
- `AuditLog` administrativo.

Defina chaves, índices, unicidade, relacionamentos, invariantes, retenção e estratégia de migração. Use valores monetários em unidade mínima inteira ou tipo decimal exato; nunca ponto flutuante binário.

Não apague histórico necessário ao alterar catálogo. Pedidos devem preservar nome, SKU, preço, desconto, tributos, frete e variante no momento da compra.

## 7. Identidade visual e experiência

Crie uma experiência moderna, refinada, acolhedora e coerente com a SOL & PETALAS.

### 7.1 Regras visuais

- Não usar gradientes em fundos, textos, botões, bordas ou ilustrações.
- Construir paleta de cores sólidas baseada em teoria das cores e papéis semânticos.
- Garantir contraste WCAG 2.2 AA.
- Usar uma família tipográfica ou, no máximo, duas com funções claras e licença adequada.
- Definir escala tipográfica responsiva, largura confortável de leitura e altura de linha coerente.
- Usar escala de espaçamento consistente baseada em múltiplos de 4 ou 8, com ajustes ópticos quando necessários.
- Definir tokens de cor, tipografia, espaço, dimensão, borda, raio, sombra, camada e movimento.
- Não copiar identidade visual do projeto anterior; preservar os padrões de qualidade, não o layout.

### 7.2 Evitar aparência genérica de IA

Evite:

- hero genérico com texto vago e dois botões sem propósito;
- roxo/azul neon, auroras, glassmorphism e brilho tecnológico sem relação com a marca;
- excesso de cards idênticos, pílulas, sombras difusas e cantos exageradamente arredondados;
- textos como “revolucione sua experiência” ou “soluções inovadoras”;
- ilustrações abstratas sem função, emojis como ícones e stock photos genéricas;
- centralização de todas as seções;
- animação em todos os elementos, parallax gratuito e entradas lentas;
- urgência falsa, contadores artificiais e descontos inventados.

Derive a composição do produto, público e conteúdo real. Escolha um elemento visual de assinatura específico da SOL & PETALAS.

### 7.3 COSS UI

Utilize <https://coss.com/ui> como biblioteca de componentes e referência de interação quando compatível com a stack.

- Avalie Card, Button, Badge, Breadcrumb, Tabs, Accordion, Toggle Group, Tooltip, Preview Card, Dialog, Drawer/Sheet, Skeleton, Toast, Form, Field, Input, Select, Pagination, Empty e Alert.
- Instale somente componentes necessários.
- Verifique versão, licença, dependências e acessibilidade antes do uso.
- Adapte tokens, estados e composição à marca; não copie os exemplos literalmente.
- Preserve a semântica e a navegação por teclado oferecidas pelos componentes.
- Não use componente complexo quando HTML nativo resolver melhor.

## 8. Arquitetura da informação e páginas

Planeje, quando aplicável:

- página inicial;
- catálogo geral;
- categoria/coleção;
- busca e resultados;
- página do produto;
- carrinho;
- checkout;
- confirmação do pedido;
- acompanhamento do pedido;
- login, cadastro e recuperação de conta;
- área do cliente, endereços, pedidos e preferências;
- favoritos, se aprovado;
- sobre a marca;
- contato e atendimento;
- perguntas frequentes;
- entrega, trocas, devoluções e cancelamento;
- privacidade, cookies e termos;
- página 404 e estados de indisponibilidade;
- painel administrativo protegido.

Cada página deve ter objetivo principal, hierarquia clara, estados de carregamento, vazio, erro, sucesso e indisponibilidade quando aplicáveis.

## 9. Catálogo, categorias, busca e filtros

### 9.1 Catálogo

- Suportar produtos ativos, rascunhos, programados, esgotados e arquivados.
- Criar slugs estáveis, redirecionando URLs quando necessário.
- Organizar categorias, coleções, tags e atributos sem duplicação arbitrária.
- Permitir ordenação por relevância, lançamento, preço e critérios autorizados.
- Paginar ou carregar progressivamente sem prejudicar URL, acessibilidade e SEO.

### 9.2 Cards de produtos

Exibir somente informações reais e necessárias:

- imagem principal e imagem alternativa no hover quando existir;
- nome, categoria e preço;
- preço promocional e desconto somente quando verdadeiros;
- parcelamento calculado pelas regras vigentes;
- cores/variações disponíveis;
- estado de estoque;
- avaliações e quantidade quando houver dados;
- badges legítimos;
- ação de abrir o produto;
- ação rápida de compra apenas quando não houver seleção obrigatória pendente.

O hover pode revelar imagem e ações em desktop, mas nenhuma informação ou funcionalidade essencial pode depender somente dele. Forneça foco, teclado e alternativa por toque.

### 9.3 Busca e filtros

- Busca tolerante a variações necessárias, sem resultados irrelevantes.
- Filtros por categorias, faixa de preço, disponibilidade e atributos reais.
- Estado dos filtros refletido na URL quando útil para navegação/compartilhamento.
- Contagens coerentes, botão de limpar, remoção individual e estado sem resultados.
- Debounce, limite de consulta, paginação e proteção contra abuso.
- Não permitir que parâmetros de busca causem injeção ou consultas ilimitadas.

## 10. Página do produto

Inclua:

- breadcrumb;
- título, marca/categoria e SKU quando apropriado;
- galeria com imagem principal, miniaturas e associação à variante;
- zoom ao passar o mouse em desktop;
- ampliação acessível em dialog/modal;
- alternativa por toque em dispositivos móveis;
- preço atual, preço anterior válido e regras de promoção;
- preço total e opções reais de parcelamento;
- seleção de cor, tamanho, modelo, material ou outras variações;
- nome textual da cor e estado de seleção perceptível;
- disponibilidade por combinação de atributos;
- quantidade e limites de compra;
- cálculo de frete e prazo;
- CTA de adicionar ao carrinho/comprar;
- descrição, materiais, medidas, cuidados e garantia;
- informações de entrega e devolução;
- avaliações;
- compartilhamento;
- produtos relacionados baseados em regra documentada.

Ao trocar variante, atualizar mídia, SKU, preço, disponibilidade e URL/estado sem inconsistências. Não permitir combinações inexistentes.

Imagens devem possuir proporção preservada, tamanhos responsivos, dimensões reservadas, formatos modernos e texto alternativo adequado.

## 11. Estoque e concorrência

- O servidor é a autoridade do estoque.
- Modelar movimentos de entrada, ajuste, reserva, venda, cancelamento e devolução.
- Impedir estoque negativo, venda duplicada e overselling por corrida de requisições.
- Usar transações, locks ou concorrência otimista conforme banco e volume.
- Revalidar estoque ao adicionar/atualizar carrinho, iniciar checkout, autorizar pagamento e confirmar pedido.
- Se houver reserva de estoque, definir duração, renovação permitida, expiração e liberação idempotente.
- Não descontar duas vezes por webhook repetido.
- Registrar auditoria de ajustes manuais com ator, motivo e quantidade anterior/nova.
- Definir comportamento para baixo estoque, esgotamento durante checkout e pré-venda, se autorizada.

## 12. Carrinho

O carrinho deve:

- adicionar produto e variante corretos;
- alterar quantidade dentro dos limites;
- remover itens e permitir desfazer quando apropriado;
- mostrar imagem, nome, atributos, preço unitário, quantidade e subtotal;
- recalcular preço, promoção e estoque no servidor;
- sinalizar alterações desde a última visita;
- estimar frete sem prometer valor definitivo incorreto;
- aplicar/remover cupom de forma validada;
- apresentar resumo: produtos, descontos, frete, tributos quando aplicáveis e total;
- funcionar para visitante e cliente autenticado conforme decisão;
- possuir estratégia explícita de mesclagem após login;
- ter expiração e retenção definidas;
- nunca armazenar informação sensível de pagamento.

Proteja contra manipulação de preço, SKU, quantidade, frete, desconto e moeda enviados pelo navegador.

## 13. Promoções, cupons e preços

- Definir regras por produto, categoria, cliente, período, quantidade, valor mínimo e limite de uso.
- Resolver prioridade, acumulação, exclusão e arredondamento de promoções.
- Validar tudo no servidor com horário confiável.
- Evitar enumeração e abuso de cupons com rate limiting e regras de uso.
- Registrar origem e composição do desconto no pedido.
- Exibir preço anterior apenas quando legítimo e compatível com as regras aplicáveis.
- Não usar urgência, escassez, contagem regressiva ou comparação de preço sem base real.

## 14. Checkout

Estruture checkout curto, claro e recuperável:

1. identificação ou continuação como visitante, se permitida;
2. dados de contato;
3. endereço e entrega;
4. forma de pagamento;
5. revisão final;
6. confirmação.

Requisitos:

- labels persistentes, autocomplete e validação acessível;
- preservar dados após erro sem reter dados proibidos;
- validar endereço, estoque, preço, desconto, frete e total no servidor;
- mostrar claramente produtos, quantidades, endereço, prazo, forma de pagamento, parcelas e total antes da confirmação;
- exigir aceite somente das políticas realmente necessárias, sem caixas pré-marcadas indevidas;
- criar pedido e tentativa de pagamento de forma idempotente;
- prevenir duplo clique e retries duplicados;
- não considerar pedido pago por retorno do navegador para página de sucesso;
- informar pendência, falha e próxima ação sem duplicar cobrança;
- não iniciar transação real em desenvolvimento/teste.

## 15. Pagamentos

Utilize um PSP/adquirente confiável e documentação oficial. Prefira checkout hospedado, campos hospedados ou tokenização para minimizar escopo PCI DSS.

### 15.1 Regras inegociáveis

- Nunca armazenar CVV/CVC/CID após autorização, nem mesmo criptografado.
- Nunca registrar PAN completo, CVV, dados de tarja, PIN ou segredos.
- Não usar hash do número do cartão como substituto de tokenização.
- Armazenar somente tokens do PSP e metadados permitidos/necessários.
- Nunca criar criptografia ou gateway de pagamento próprio.
- Calcular valor, moeda, parcelas, descontos e pedido no servidor.
- Usar chaves de idempotência em criação, autorização, captura, cancelamento e reembolso.
- Assinar/verificar webhooks conforme o PSP; validar timestamp e impedir replay.
- Processar eventos repetidos e fora de ordem sem corromper estado.
- Vincular pagamento a pedido, valor, moeda, cliente e tentativa.
- Não expor chaves privadas no frontend.

### 15.2 Máquina de estados

Defina estados e transições explícitas, por exemplo:

`created`, `pending`, `requires_action`, `authorized`, `captured`, `paid`, `failed`, `cancelled`, `expired`, `partially_refunded`, `refunded`, `disputed` e `chargeback`.

Impeça transições inválidas ou regressivas. Separe estado do pagamento, estado do pedido e estado do envio.

### 15.3 Cartão e parcelamento

- Exibir número de parcelas, valor por parcela, valor total, juros e demais informações aplicáveis antes da confirmação.
- Validar elegibilidade, limite, valor mínimo e regra de arredondamento no servidor/PSP.
- Implementar 3-D Secure quando exigido ou recomendado pelo risco/provedor.
- Tratar autenticação adicional, autorização negada, timeout, captura posterior, cancelamento, estorno parcial/total e chargeback.

### 15.4 Pix

- Gerar cobrança e QR Code pela API oficial do PSP/instituição participante.
- Preferir QR Code dinâmico para vincular cobrança, `txid`, valor, recebedor e expiração.
- Confirmar pagamento por webhook autenticado e/ou consulta ativa ao PSP.
- Validar valor, recebedor, identificador, status e ausência de duplicidade antes de liberar o pedido.
- Nunca confiar em captura de tela, QR Code exibido ou declaração do cliente como confirmação.
- Expirar cobranças e impedir reutilização indevida.
- Implementar devolução e conciliação conforme o PSP.

### 15.5 Webhooks e conciliação

- Verificar assinatura usando o corpo bruto quando requerido.
- Comparar assinaturas em tempo constante quando aplicável.
- Armazenar ID do evento e tornar processamento idempotente.
- Responder rapidamente e processar de forma segura.
- Consultar ativamente o PSP em eventos críticos ou divergentes.
- Conciliar periodicamente pedidos, pagamentos, reembolsos e disputas.
- Alertar divergência financeira e permitir correção auditada.

## 16. CEP, endereço, frete e logística

Separe responsabilidades:

- API de CEP, como ViaCEP, para consulta/validação de endereço;
- serviço da transportadora, Correios ou agregador para cotação e contratação do frete.

Uma API de CEP não calcula frete por si só.

### 16.1 Consulta de CEP

- Aceitar e normalizar oito dígitos.
- Tratar formato inválido, CEP inexistente, timeout, limite e indisponibilidade.
- Preencher endereço como auxílio, permitindo correção de campos apropriados.
- Solicitar número e complemento separadamente.
- Não considerar endereço válido apenas porque o CEP existe.
- Aplicar debounce/cache/rate limit sem realizar uso massivo abusivo.

### 16.2 Cotação

- Calcular no servidor usando origem, destino, peso, dimensões, quantidade, embalagem, valor declarado e regras reais.
- Exibir modalidade, preço, prazo estimado e restrições.
- Tratar área não atendida, produto incompatível e serviço indisponível.
- Expirar cotações e recalcular antes do pagamento.
- Impedir manipulação do frete pelo cliente.
- Registrar a cotação escolhida no pedido.

### 16.3 Expedição e rastreamento

- Criar envio apenas após condição de pagamento definida.
- Gerar etiqueta/declaração quando a integração suportar.
- Armazenar código e URL de rastreamento de forma segura.
- Atualizar estados por webhook/polling idempotente.
- Comunicar postagem, trânsito, entrega e exceções.
- Não expor dados pessoais além do necessário.

## 17. Pedidos, atendimento e pós-venda

Defina estados, por exemplo:

`draft`, `awaiting_payment`, `paid`, `processing`, `ready_to_ship`, `shipped`, `delivered`, `cancelled`, `return_requested`, `returned`, `partially_refunded` e `refunded`.

- Toda transição deve ter regra, ator, data e evento de auditoria.
- O cliente deve consultar pedido com autenticação ou mecanismo seguro de acesso.
- Gerar número público não previsível o suficiente para impedir enumeração.
- Preservar histórico de itens, valores, endereço usado, pagamento e envio conforme retenção.
- Permitir cancelamento, troca, devolução e reembolso segundo política e legislação aplicáveis.
- Registrar motivo, itens, quantidades, condição, logística reversa, decisão e valor reembolsado.
- Não permitir que suporte reembolse ou altere pedido sem autorização e trilha de auditoria.

## 18. Conta do cliente e autenticação

- Permitir checkout como visitante somente se a regra de negócio autorizar.
- Cadastro com verificação proporcional ao risco.
- Senhas protegidas com Argon2id ou mecanismo seguro oferecido pelo provedor de identidade.
- Recuperação com token único, curto, invalidável e sem enumeração de contas.
- Cookies `Secure`, `HttpOnly` e `SameSite` apropriados.
- Rotação e invalidação de sessão.
- MFA obrigatório para administradores e recomendado para ações sensíveis.
- Área do cliente com pedidos, endereços, preferências e solicitações de privacidade.
- Autorização por objeto para impedir acesso a pedido/endereço de outro usuário.
- Alterações de e-mail, senha e dados sensíveis exigem confirmação adequada.

## 19. Avaliações

- Média, quantidade e distribuição por estrelas.
- Comentário, nota, data e identificação pública apropriada.
- Selo de compra verificada apenas com comprovação.
- Paginação e ordenação quando necessárias.
- Estado sem avaliações.
- Moderação, denúncia, resposta da loja e trilha de decisões.
- Proteção contra spam, abuso, XSS e exposição de dados pessoais.
- Regras claras para edição/remoção.
- Dados estruturados somente quando as avaliações forem reais e elegíveis.
- Nunca gerar avaliações fictícias como conteúdo de produção.

## 20. Compartilhamento e favoritos

- Usar Web Share API quando suportada e fallback para copiar link.
- Compartilhar URL canônica e preservar variante somente quando fizer sentido.
- Exibir feedback acessível de sucesso/erro.
- Configurar Open Graph e imagem social real.
- Favoritos devem funcionar apenas se aprovados; definir comportamento para visitante, login, sincronização e privacidade.

## 21. Painel administrativo

Criar área separada e protegida para, conforme papéis:

- produtos, variantes, mídia, categorias e coleções;
- preços e promoções;
- estoque e movimentos;
- pedidos, pagamentos e reembolsos;
- expedição e rastreamento;
- clientes e solicitações de privacidade;
- avaliações e moderação;
- conteúdo institucional e SEO;
- usuários administrativos, papéis e permissões;
- configurações não secretas;
- relatórios e exportações autorizadas.

### 21.1 Segurança administrativa

- RBAC/ABAC e menor privilégio.
- MFA.
- Reautenticação para reembolso, exportação, mudança bancária e permissões.
- Auditoria de login, criação, alteração, exclusão, estoque, preço, pedido e reembolso.
- Proteção contra mass assignment, IDOR, CSRF e elevação de privilégio.
- Exportações limitadas, justificadas, registradas e protegidas.
- Segredos gerenciados fora da interface comum.
- Nenhuma ação destrutiva ampla sem confirmação e mecanismo de recuperação quando possível.

## 22. Emissão fiscal, tributos e contabilidade

- Não inventar regras tributárias nem calcular obrigações sem serviço/validação adequada.
- Confirmar enquadramento, documentos, dados obrigatórios e provedor fiscal com profissional responsável.
- Integrar emissão de nota por adaptador e ambiente de homologação.
- Tornar emissão, cancelamento e retry idempotentes.
- Associar documento ao pedido sem expor dados além do necessário.
- Registrar falhas para correção operacional.
- Separar preço de produto, desconto, frete, tributos e total.

## 23. Comunicações transacionais

Defina templates e eventos para:

- criação do pedido;
- pagamento pendente, aprovado ou recusado;
- Pix criado e próximo da expiração;
- pedido em preparação;
- envio e rastreamento;
- entrega;
- cancelamento;
- troca/devolução;
- reembolso;
- recuperação e segurança de conta.

Requisitos:

- não revelar dados sensíveis;
- links com destino oficial e HTTPS;
- tokens curtos, específicos e invalidáveis;
- idempotência e prevenção de notificações duplicadas;
- logs de tentativa e falha sem conteúdo sensível;
- distinguir comunicação transacional de marketing;
- marketing somente com base legal/consentimento e opção de saída aplicáveis;
- não depender exclusivamente de e-mail para operações críticas sem alternativa de consulta.

## 24. Atendimento, políticas e direitos do consumidor

- Exibir de forma clara dados da empresa, contato, características essenciais, preço total, despesas adicionais, formas de pagamento e condições de oferta.
- Apresentar política de entrega, troca, devolução, cancelamento, garantia, privacidade e termos antes da compra quando aplicável.
- Fornecer confirmação do pedido e canal eficaz de atendimento.
- Implementar mecanismo claro para o direito de arrependimento e demais direitos aplicáveis ao comércio eletrônico brasileiro, com confirmação de recebimento da solicitação.
- Não usar dark patterns, consentimento forçado, taxas ocultas, escassez falsa ou cancelamento deliberadamente difícil.
- Submeter textos e fluxos legais à validação de profissional responsável antes da produção.

## 25. Privacidade e LGPD

- Criar inventário de dados, finalidades, bases legais, operadores, compartilhamentos, retenção e descarte.
- Coletar somente o necessário para compra, entrega, fiscal, atendimento, prevenção a fraude e obrigações aplicáveis.
- Não exigir criação de conta ou consentimentos desnecessários apenas para coletar mais dados.
- Disponibilizar aviso de privacidade claro e canal para direitos do titular.
- Implementar acesso, correção, portabilidade quando aplicável, oposição, revogação e eliminação observando retenções legais.
- Pseudonimizar dados em analytics e testes.
- Não copiar produção indiscriminadamente para ambientes inferiores.
- Definir expiração de carrinhos, sessões, logs, eventos, endereços e dados de marketing.
- Consentimento de cookies não essenciais deve ser granular e revogável quando aplicável.
- Não carregar analytics/marketing não essencial antes da escolha válida quando a base exigir consentimento.
- Registrar preferências e versões dos avisos sem armazenar dados excessivos.

## 26. Segurança de aplicação e infraestrutura

Use OWASP ASVS e OWASP Top 10 como catálogo verificável.

### 26.1 Aplicação e API

- Validar esquema, tipo, tamanho, formato, faixa e semântica de toda entrada.
- Queries parametrizadas e encoding contextual de saída.
- Prevenir XSS, CSRF, SQL/NoSQL injection, SSRF, path traversal, deserialização, upload malicioso, open redirect e mass assignment.
- Autorização no servidor para cada objeto e função.
- CORS limitado às origens, métodos e headers necessários.
- Rate limiting por risco para login, recuperação, busca, reviews, CEP, frete, cupom, checkout e webhooks.
- Limites de payload, timeout, circuit breaker e falha segura.
- Mensagens sem stack trace, segredos ou enumeração.
- IDs públicos não sequenciais quando a previsibilidade aumentar risco.

### 26.2 Navegador e página de pagamento

- CSP restritiva e ajustada às integrações autorizadas.
- HSTS e headers de segurança adequados.
- Inventário e justificativa de scripts de terceiros.
- Minimizar scripts na página de checkout/pagamento.
- Verificar integridade e monitorar alterações de scripts e headers que afetem segurança, conforme obrigações PCI aplicáveis.
- Não inserir analytics, chat ou tags desnecessárias na página de pagamento.
- Proteger contra e-skimming e comprometimento da cadeia de scripts.

### 26.3 Segredos e criptografia

- Secret manager/KMS ou serviço equivalente.
- Nenhum segredo em código, histórico Git, frontend, logs, imagens ou `.env.example`.
- TLS moderno em trânsito e criptografia em repouso quando aplicável.
- Rotação, revogação, auditoria e menor privilégio para chaves.
- Não implementar criptografia própria.

### 26.4 Infraestrutura e supply chain

- Separar desenvolvimento, teste, homologação e produção.
- Privilégio mínimo em banco, cloud, CI/CD e serviços.
- Lockfile, dependências fixadas conforme estratégia e atualização controlada.
- SAST, SCA, secret scanning, análise de IaC e SBOM.
- Artefatos reproduzíveis e origem verificável.
- Backups criptografados com restauração testada.
- WAF/CDN e proteção contra abuso quando proporcionais ao risco.
- Não expor banco, painel, storage ou ambientes de preview publicamente sem proteção.

## 27. Acessibilidade

Adote WCAG 2.2 nível AA:

- HTML semântico antes de ARIA.
- Navegação completa por teclado e foco sempre visível.
- Ordem de leitura/foco coerente.
- Link para pular conteúdo.
- Headings e landmarks corretos.
- Labels persistentes, instruções e erros associados.
- Não usar placeholder como único rótulo.
- Texto alternativo adequado e imagens decorativas com `alt=""`.
- Contraste mínimo aplicável para texto e componentes.
- Informação nunca transmitida apenas por cor.
- Alvos de toque adequados.
- Zoom/reflow e espaçamento de texto sem perda.
- Modais com foco contido e retorno correto.
- Toasts/atualizações dinâmicas anunciados sem excesso.
- `prefers-reduced-motion` e experiência completa sem hover.
- Testes automáticos, teclado e leitor de tela quando disponível.

## 28. Responsividade, interações e movimento

- Mobile-first por padrão.
- Breakpoints definidos pelo conteúdo.
- Testar aproximadamente 320–375, 768, 1024, 1280 e 1440 px quando aplicável.
- Sem rolagem horizontal acidental.
- Menus, filtros, galeria, tabela, painel e checkout com comportamento específico em telas pequenas.
- O mouse é importante em desktop, mas hover nunca é o único acesso.
- Interações equivalentes por foco e toque.
- Animações curtas, funcionais e preferencialmente com `transform`/`opacity`.
- Não bloquear interação por animação.
- Skeleton apenas quando representar a estrutura; timeout e retry em espera longa.

## 29. Desempenho

Metas no percentil 75, mobile e desktop:

- LCP ≤ 2,5 s;
- INP ≤ 200 ms;
- CLS ≤ 0,1.

Defina orçamento de JavaScript, CSS, imagens, fontes, requisições e terceiros.

- Enviar o mínimo de JavaScript.
- Code splitting por rota/funcionalidade.
- Priorizar recurso LCP e evitar waterfalls.
- Imagens modernas, responsivas, comprimidas e dimensionadas.
- Não aplicar lazy loading no LCP sem justificativa.
- Fontes com poucos pesos, subset, preload criterioso e fallback compatível.
- Cache HTTP/CDN e invalidação coerente.
- Reservar espaço para mídia e conteúdo assíncrono.
- Paginar catálogos e avaliações.
- Medir em laboratório e, após produção, com RUM autorizado.
- Não sacrificar segurança, acessibilidade ou correção por pontuação.

## 30. SEO e descoberta

- Título e descrição únicos por página pública.
- URLs e slugs estáveis.
- Canonical coerente.
- Sitemap e robots sem indexar ambiente, conta, carrinho, checkout, busca interna ou admin.
- Status HTTP e redirects corretos.
- Breadcrumbs e links internos.
- Schema.org válido para Organization, Product, Offer, Breadcrumb e AggregateRating somente com dados reais.
- Open Graph e metadados sociais.
- Conteúdo original e útil; não preencher páginas com texto para palavras-chave.
- Estratégia para variantes, filtros e paginação evitando conteúdo duplicado.
- Página 404 útil e páginas removidas tratadas corretamente.

## 31. Analytics e métricas

Somente após definir privacidade e consentimento:

- funil: visualização de lista, produto, variante, carrinho, checkout, pagamento e compra;
- busca, filtro, cupom e erro de pagamento;
- desempenho e falhas por jornada;
- conversão sem expor dados pessoais desnecessários;
- eventos com nomes, propriedades e versões documentados;
- deduplicação de compra entre cliente e servidor;
- ambiente de teste separado;
- não enviar PAN, CVV, senha, endereço completo, tokens ou dados sensíveis ao analytics.

## 32. Estados de interface obrigatórios

Implemente e teste conforme aplicável:

- carregamento e carregamento lento;
- vazio;
- sem resultados;
- erro recuperável;
- indisponibilidade externa;
- offline/rede interrompida quando relevante;
- produto/variante esgotado;
- preço ou estoque alterado;
- CEP inválido/inexistente;
- frete indisponível;
- cupom inválido, expirado ou inelegível;
- carrinho vazio/expirado;
- pagamento pendente, aprovado, recusado ou expirado;
- webhook atrasado;
- pedido inexistente ou acesso negado;
- avaliação vazia/em moderação;
- sucesso e erro no compartilhamento;
- sessão expirada.

## 33. Testes

### 33.1 Unitários

- dinheiro e arredondamento;
- promoções e cupons;
- variantes;
- estoque e reservas;
- estados de pedido/pagamento;
- frete e expiração de cotação;
- permissões;
- validações e normalizações.

### 33.2 Integração

- banco, transações e concorrência;
- PSP sandbox;
- webhooks válidos, inválidos, repetidos e fora de ordem;
- CEP e logística com mocks/contratos;
- e-mail e fiscal em sandbox;
- autenticação/autorização;
- cache/revalidação.

### 33.3 E2E

- navegar catálogo e filtrar;
- pesquisar e abrir produto;
- selecionar variante;
- adicionar/alterar/remover no carrinho;
- aplicar cupom;
- calcular frete;
- checkout como visitante/cliente conforme regra;
- Pix em sandbox;
- cartão sandbox com sucesso, recusa e autenticação adicional;
- pedido e confirmação por webhook;
- cancelamento/reembolso autorizados;
- área do cliente;
- operações administrativas críticas.

### 33.4 Segurança, acessibilidade e qualidade

- lint, Prettier e typecheck;
- SAST, SCA, secret scanning e IaC;
- teste de autorização por objeto/função;
- abuso de preço, estoque, cupom, frete e webhook;
- axe ou equivalente, teclado e leitor de tela quando disponível;
- regressão visual;
- navegadores e larguras suportados;
- desempenho e Core Web Vitals;
- console e logs sem erro relevante.

Nenhum teste em produção, pentest ativo ou transação real sem autorização explícita. Use dados e cartões de sandbox.

## 34. Observabilidade e resposta a incidentes

- Logs estruturados com correlação, ator, ação e resultado, sem dados proibidos.
- Métricas de erros, latência, checkout, pagamentos, webhooks, estoque, frete, fiscal e notificações.
- Tracing proporcional ao sistema.
- Alertas acionáveis para falha de pagamento, divergência, fila/retry, overselling, fraude, pico de erros e indisponibilidade.
- Health checks sem expor segredos.
- Runbooks para PSP indisponível, webhook parado, estoque divergente, cobrança duplicada, vazamento de credencial, exposição de dados e falha de deploy.
- Preservação de evidências, contenção, rotação de segredos, comunicação e lições aprendidas.
- Testar restauração de backup e continuidade.

## 35. CI/CD, ambientes e implantação

- Ambientes isolados e credenciais próprias.
- Preview protegido e sem indexação.
- Pipeline com lint, typecheck, testes, segurança e build.
- Branch protegida e revisão obrigatória.
- Migrações versionadas, compatíveis com rollout e rollback.
- Feature flags para integrações arriscadas quando útil.
- Deploy progressivo e rollback documentado.
- Verificações pós-deploy sem compra real não autorizada.
- Segredos e variáveis validados por ambiente.
- Dados de sandbox nunca misturados com produção.

Pare e peça aprovação antes de domínio/DNS, produção, migração destrutiva, credencial real, pagamento real, e-mail para clientes, reembolso, exclusão ou mudança de infraestrutura.

## 36. Processo de implementação

Execute nesta ordem:

1. descoberta e perguntas;
2. escopo e critérios de sucesso;
3. sitemap e jornadas;
4. design system e protótipo da fatia principal;
5. arquitetura, modelo de dados e ameaças;
6. infraestrutura local, CI e qualidade;
7. catálogo e administração básica;
8. produto, variantes e estoque;
9. carrinho e promoções;
10. checkout e frete em sandbox;
11. pagamentos em sandbox;
12. pedidos, pós-venda e notificações;
13. privacidade, políticas e operação;
14. testes completos e correções;
15. revisão de segurança/desempenho/acessibilidade;
16. homologação humana;
17. plano de produção e rollback;
18. implantação somente após autorização.

Em cada fase, faça mudanças pequenas e revisáveis. Preserve alterações existentes do usuário. Não alegue conclusão sem evidência.

## 37. Entregáveis

1. resumo executivo e escopo;
2. perguntas, respostas e premissas;
3. sitemap, fluxos e wireframes;
4. direção visual e design system;
5. arquitetura e ADRs;
6. modelo de dados e migrações;
7. mapa de integrações e ambientes;
8. modelo de ameaças e matriz de controles;
9. código funcional e organizado;
10. testes e resultados;
11. documentação das APIs/webhooks;
12. painel administrativo;
13. políticas e textos pendentes de validação;
14. runbooks e observabilidade;
15. README com instalação, configuração, execução, testes, build e deploy;
16. `.env.example` sem segredos;
17. checklist de homologação/produção;
18. limitações, riscos residuais e backlog priorizado.

## 38. Critérios de aceite para produção

O e-commerce somente pode ser recomendado para produção quando:

- catálogo, variantes, preços e estoque reais estiverem validados;
- compra completa funcionar em sandbox e homologação;
- valores, descontos, frete e estoque forem recalculados no servidor;
- idempotência impedir cobrança/pedido duplicado;
- webhooks, replay, repetição e eventos fora de ordem estiverem testados;
- CVV/PAN não forem armazenados ou registrados indevidamente;
- Pix/cartão, cancelamento, reembolso e conciliação estiverem testados;
- pedidos, expedição, comunicação e pós-venda tiverem fluxos definidos;
- painel administrativo tiver MFA, menor privilégio e auditoria;
- políticas e informações empresariais estiverem aprovadas;
- LGPD/cookies tiverem análise e implementação aplicável;
- WCAG 2.2 AA tiver sido verificada;
- metas de desempenho tiverem sido medidas e desvios justificados;
- lint, typecheck, testes e verificações de segurança passarem;
- não houver achado crítico/alto aberto sem tratamento formal;
- backup, restauração, alertas e rollback tiverem sido testados;
- nenhuma informação fictícia aparecer como real;
- o responsável humano aprovar produção e riscos residuais.

## 39. Formato de resposta do agente

Em cada ponto de controle, responda:

1. **Resultado da fase**
2. **Premissas e informações ausentes**
3. **Decisões e justificativas**
4. **Arquivos alterados**
5. **Testes executados e resultados**
6. **Problemas e riscos**
7. **Pendências**
8. **Próximo passo e aprovação necessária**

Se não puder executar uma verificação, diga claramente e forneça o procedimento seguro, o resultado esperado e a evidência necessária. Nunca invente comandos executados, métricas, arquivos, testes, integrações ou aprovações.

## 40. Referências mínimas

Consulte versões vigentes e documentação oficial específica dos provedores:

- COSS UI: <https://coss.com/ui>
- WCAG 2.2: <https://www.w3.org/WAI/WCAG22/quickref/>
- Core Web Vitals: <https://web.dev/articles/vitals>
- OWASP ASVS: <https://owasp.org/www-project-application-security-verification-standard/>
- OWASP Top 10: <https://owasp.org/Top10/>
- OWASP API Security: <https://owasp.org/API-Security/>
- OWASP Web Security Testing Guide: <https://owasp.org/www-project-web-security-testing-guide/>
- PCI Security Standards: <https://www.pcisecuritystandards.org/standards/>
- Segurança de páginas de pagamento e e-skimming: <https://blog.pcisecuritystandards.org/new-information-supplement-payment-page-security-and-preventing-e-skimming>
- Banco Central do Brasil — Pix: <https://www.bcb.gov.br/estabilidadefinanceira/pix>
- ViaCEP: <https://viacep.com.br/>
- LGPD — texto compilado: <https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709compilado.htm>
- Código de Defesa do Consumidor: <https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm>
- Decreto do comércio eletrônico: <https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm>
- ANPD — cookies e proteção de dados: <https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf/@@display-file/file>

---

## Instrução inicial

Comece lendo todos os arquivos anexados e inspecionando o repositório. Não escreva código ainda. Primeiro apresente:

1. resumo do que já está definido;
2. informações obrigatórias ainda ausentes;
3. até doze perguntas priorizadas;
4. escopo proposto para o MVP;
5. sitemap e jornadas principais;
6. riscos e integrações dependentes de fornecedor;
7. plano de implementação por fases.

Aguarde as respostas necessárias antes de implementar pagamentos, frete, fiscal, políticas, estoque real ou produção.
