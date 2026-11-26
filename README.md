# Wanda Cosméticos & Fashion

Loja virtual moderna, elegante e responsiva para a marca **Wanda Cosméticos & Fashion**:
perfumes, loções e óleos originais **Inuka** e moda feminina selecionada da **Shein**.
Os pedidos são finalizados por **WhatsApp**, com pagamento por M-Pesa, e-Mola, transferência
bancária ou numerário na entrega.

## Funcionalidades

- Hero em carrossel com chamada para ação ("Ver Catálogo")
- Categorias em círculos e dois banners grandes (Universo Inuka e Moda Shein)
- Vitrine com filtros (Todos, Perfumes Inuka, Moda Shein, Promoções), pesquisa e "Ver mais produtos"
- Etiquetas "Novo" e "Mais Vendido", percentagem de desconto e favoritos
- Produtos sem preço mostram "Preço sob consulta" e abrem uma conversa no WhatsApp
- Carrinho em gaveta lateral, com quantidades e total, que envia o pedido por WhatsApp
- Secção "Monte o seu look" (moda Shein + perfume Inuka)
- Como comprar em 3 passos, Sobre nós, rodapé e botão flutuante do WhatsApp
- Design responsivo (telemóvel, tablet e computador), animações ao fazer scroll

## Tecnologias

React 19, TypeScript, Vite, CSS Modules, Radix UI (Dialog e Slot) e lucide-react.
Tipografia: Playfair Display (títulos) e Montserrat (texto).

## Estrutura

```
wanda-cosmeticos-fashion/
├─ public/
│  └─ images/            # fotos do site (ver public/images/LEIA-ME.md)
├─ src/
│  ├─ components/        # Button, Input e Sheet (gaveta do carrinho)
│  ├─ data/catalog.ts    # produtos, preços, etiquetas e cortes das fotos
│  ├─ hooks/             # useScrollReveal, useCallbackRef
│  ├─ styles/base.css    # cores, tipografia, espaçamentos
│  ├─ App.tsx            # página da loja
│  ├─ App.module.css
│  ├─ config.ts          # número de WhatsApp e pasta das imagens
│  └─ main.tsx
├─ .github/workflows/deploy.yml   # publicação automática no GitHub Pages
├─ .env.example
├─ index.html
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## Como executar

1. Instale o [Node.js](https://nodejs.org) 20 ou superior.
2. Coloque as imagens em `public/images/` (nomes em `public/images/LEIA-ME.md`).
3. Copie `.env.example` para `.env` e escreva o número de WhatsApp real (sem "+" nem espaços).
4. Execute:

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera a pasta dist/
npm run preview  # pré-visualiza a versão final
```

## Como editar os produtos

Tudo está em `src/data/catalog.ts`. Cada produto tem:

| Campo | Para que serve |
|---|---|
| `name`, `cat`, `sub` | nome, categoria (`Inuka` ou `Shein`) e subcategoria |
| `price` | preço em MT; `null` mostra "Preço sob consulta" |
| `old` | preço antigo, para promoções (mostra o desconto) |
| `tag` | `"Novo"` ou `"Mais Vendido"` |
| `img` | caminho da foto (ficheiro em `public/images`) |
| `crop` | zoom e ponto de corte da foto, para esconder marcas nas capturas |

Os preços dos perfumes Inuka são de exemplo e os da moda Shein estão por preencher.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie o código para a branch `main`.
2. Em **Settings › Pages**, escolha **GitHub Actions** como fonte.
3. Em **Settings › Secrets and variables › Actions › Variables**, crie `VITE_WHATSAPP_NUMBER` com o número da loja.
4. Cada `git push` na `main` publica o site automaticamente.

## Notas

- As fotos dos perfumes Inuka são as oficiais da marca; as da moda são capturas da Shein já recortadas (sem logótipos). O ideal é trocá-las por fotografias próprias.
- As imagens do topo do site, do banner Moda Shein e do "Monte o seu look" usam fotos reais provisórias; troque-as em `IMG` no início de `src/App.tsx`.
- Preços: os dos 4 primeiros produtos Inuka são de exemplo e os restantes estão por preencher ("Preço sob consulta").
- 23 produtos antigos de moda aguardam foto: ver `PRODUTOS-PENDENTES.md`.
- As redes sociais do rodapé ainda apontam para `#`: troque pelos links reais em `src/App.tsx`.
