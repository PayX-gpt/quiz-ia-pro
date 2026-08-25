# Quiz IA PRO — clone de `0f371c6o.xquiz.io`

Clone fiel do funil **"QUIZ MATIAZ TRADER 2"**, reconstruído a partir dos dados reais
do funil publicado. Textos, cores, fontes, imagens, vídeos, etapas, transições
e regras de navegação são os mesmos do original.

## Como rodar

```bash
npm install
npm run dev
```

Abre em <http://localhost:5273>. O layout é mobile-first (igual ao original,
`max-w-lg` centralizado), então vale testar em viewport de celular.

## Como foi feito

O funil do xquiz é um app Next.js que embute todo o conteúdo do funil no HTML
da página. Esse conteúdo foi extraído para [`src/funnel.json`](src/funnel.json)
— são os **30 nós** originais, com todas as etapas, opções,
cores, fontes e embeds de vídeo, sem nada reescrito à mão.

O app é um **renderizador desses dados**, e não uma cópia visual aproximada:
cada tipo de bloco tem um componente em `src/blocks/` que reproduz a mesma
marcação e as mesmas classes do original (conferidas no site publicado).
Por isso, editar o funil é editar o JSON — o render acompanha.

- `src/engine.ts` — navegação: cada opção de quiz e cada botão é um
  *handle*, e as arestas do funil dizem para qual etapa ele leva.
- `src/blocks/` — um componente por tipo de bloco.
- `src/assets.ts` — mapa `uuid → arquivo local`; as 14 imagens
  foram baixadas do CDN para `public/images/`.

## Etapas (caminho principal)

| # | Slug | Etapa | Blocos |
|---|------|-------|--------|
| 1 | `5g4a4l2l` | Hook Page V.1 ORIGINAL | containerV2, titleV3, imageV3, textV3, buttonV3, textV3 |
| 2 | `1v27142j` | Etapa 1 | progressV3, titleV3, quizV2 |
| 3 | `5v1g294c` | Etapa 2 | progressV3, titleV3, quizV2 |
| 4 | `283m563h` | Etapa 3 | progressV3, titleV3, quizV2 |
| 5 | `5y035p50` | Etapa 4 (Depoimentos) | progressV3, titleV3, carouselV3, textV3, buttonV3 |
| 6 | `315t6b62` | Etapa 5 | progressV3, titleV3, quizV2 |
| 7 | `2q6b5s5r` | Etapa 6 (Video 1) | progressV3, scriptV3, titleV3, videoV3, buttonV3 |
| 8 | `0b6w3f43` | Etapa 7 | progressV3, titleV3, quizV2 |
| 9 | `1d63000k` | Etapa 8 | progressV3, titleV3, quizV2 |
| 10 | `6w1b5k5v` | Etapa 9 (Video 2) | progressV3, scriptV3, titleV3, videoV3, buttonV3 |
| 11 | `1b09635u` | Etapa 10 | progressV3, titleV3, quizV2 |
| 12 | `2v5v4e2i` | Etapa 11 | progressV3, titleV3, quizV2 |
| 13 | `0h1l6l70` | Etapa 12 | progressV3, stopWatchTime, titleV3, loadingV3, textV3, redirectV3 |
| 14 | `0c1l4z2l` | Etapa 13 (IA LIBERADA) | containerV2, titleV3, videoV3, buttonV3 |
| 15 | `285y2m67` | Etapa 14 (Depoimentos) | titleV3, carouselV3, textV3, buttonV3 |
| 16 | `2n610036` | Etapa 15 (Video 3) | progressV3, scriptV3, titleV3, videoV3, buttonV3 |
| 17 | `4n3k0627` | Etapa 16 | progressV3, titleV3, quizV2 |
| 18 | `5m736x4h` | Etapa 17 | titleV3, textV3, buttonV3 |
| 19 | `334n1a6y` | Etapa 18 (Video 4) | progressV3, scriptV3, titleV3, videoV3, buttonV3 |
| 20 | `162p2v0j` | PITCH | stopWatchTime, titleV3, titleV3, videoV3, textV3, containerV2, videoV3, textV3, containerV2, videoV3, textV3, containerV2, titleV3, titleV3, textV3, buttonV3, containerV2, textV3, buttonV3, containerV2, titleV3, textV3, buttonV3, containerV2, titleV3, videoV3, titleV3, textV3, buttonV3 |
| 21 | — | **Link** | `https://checkout.ticto.app/OD0A4E44E` |

## Etapas alternativas (no funil, fora do caminho ativo)

Variações de hook e de pitch que existem no original mas não estão ligadas ao
fluxo publicado. Ficaram preservadas e podem ser abertas por `?step=`.

| Slug | Etapa |
|------|-------|
| `1u6v4306` | HOOK 4 - Video |
| `180m0m2r` | HOOK 3 - Video |
| `5v244422` | Hook Page V.2 - GIF PIX |
| `463z563z` | Etapa 1 |
| `026k724s` | Etapa 18 (Video 4) |
| `324e5c3g` | PITCH |

## Pré-visualizar uma etapa direto

Acrescente `?step=` com o slug ou o nome da etapa:

```
http://localhost:5273/?step=162p2v0j
http://localhost:5273/?step=Etapa 12
```

## Rastreamento

Todas as 20 etapas são rastreadas. Cada evento vai para a tabela
`funnel_events` no Supabase, no **mesmo formato** que o `/live` do
OB LOVABLE V1 usa (`session_id`, `event_name`, `event_data` jsonb,
`page_url`, `user_agent`).

| Evento | Quando dispara |
|---|---|
| `page_loaded` | Primeira carga do funil |
| `step_viewed` | Toda vez que uma etapa aparece |
| `step_completed` | Quando o lead avança de uma etapa |
| `quiz_answered` | Resposta escolhida, com o texto da opção |
| `checkout_click` | Clique que leva ao checkout (com `keepalive`) |
| `backredirect_fired` | Lead tentou sair pelo botão "voltar" |

**Atribuição.** Na primeira visita o funil captura `src`, `sck`, os cinco
`utm_*`, `fbclid`, `ttclid` e `gclid`, guarda por toda a sessão e reanexa no
link do checkout. O primeiro valor visto vence, então navegar para uma URL
limpa não apaga a origem.

**Pixels.** Meta (+CAPI), TikTok e GA/GTM. Cada um só carrega se o ID
correspondente estiver no `.env` — sem ID, nenhuma requisição sai, então
rodar local não suja os dados das campanhas.

## Painel `/live`

Em <http://localhost:5273/live>. Mostra sessões, etapas vistas, checkouts,
conversão e backredirects; o funil etapa por etapa com alcance e queda;
as três maiores quedas em destaque; sessões e checkouts por dia; origem do
tráfego por campanha; dispositivos; e um feed de eventos em tempo real via
Supabase Realtime. Clicar numa etapa de quiz abre a distribuição das respostas.

Sem Supabase configurado ele roda em **modo demonstração**, com números
simulados sobre as etapas reais, e avisa isso no topo.

### Configurar

1. Crie um projeto no Supabase.
2. Rode `supabase/migrations/0001_funnel_events.sql` no SQL Editor.
3. Copie `.env.example` para `.env` e preencha a URL e a anon key.

> A migration deixa a leitura liberada para a anon key — é o que faz o
> `/live` abrir sem login. Se o painel for ficar exposto na internet, troque
> a policy de SELECT para `TO authenticated` e coloque login.

## Detalhes fiéis ao original que valem saber

- **Botões com atraso.** Nas etapas de vídeo o botão só aparece depois de um
  tempo (30s na Etapa 6, 115s na Etapa 9, 54s na 15, 35s na 13, 312s na 18) —
  exatamente como no funil publicado. Use `?step=` para não esperar.
- **Vídeos.** Os embeds de PandaVideo e VTurb são os originais, carregados dos
  mesmos players. Nada foi re-hospedado.
- **Checkout.** O botão final leva para o mesmo link Ticto do original.
- **Etapa 12** roda 8s de "Analisando..." e então avança sozinha, via o bloco
  `redirectV3` do funil.
- **Backredirect.** Portado do script do próprio funil: prende o botão
  "voltar" e manda para a oferta de recuperação, uma vez por sessão,
  levando os parâmetros da URL junto.
- **Tema.** Fundo `#0e172a`, texto `#ffffff`,
  fonte Poppins — os mesmos valores do tema do funil.
