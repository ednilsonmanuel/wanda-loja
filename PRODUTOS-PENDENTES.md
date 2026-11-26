# Produtos à espera de foto

Estes 23 produtos de moda Shein foram retirados da vitrine porque as fotos (`IMG_0898` a `IMG_0927`) ainda não estão em `public/images/`.

Quando tiver as fotos: copie-as para `public/images/`, cole as linhas abaixo em `src/data/catalog.ts` (dentro de `PRODUCTS`) e, em `src/App.tsx`, volte a pôr os círculos **Bodies** (id 21), **Calções** (id 25) e **Calçado** (id 26) na lista `CIRCLES`.

```ts
  { id: 10, name: "Vestido Branco Halter", cat: "Shein", sub: "Vestido", price: null, img: P + "IMG_0910.jpeg", crop: { s: 1.12, x: 50, y: 71 } },
  { id: 11, name: "Vestido Midi Branco com Alças", cat: "Shein", sub: "Vestido", price: null, img: P + "IMG_0899.jpeg", crop: { s: 1.33, x: 0, y: 10 } },
  { id: 12, name: "Vestido Vermelho Corset", cat: "Shein", sub: "Vestido", price: null, img: P + "IMG_0900.jpeg", crop: { s: 1.27, x: 50, y: 28.6 } },
  { id: 13, name: "Saia Midi Estampada com Laço", cat: "Shein", sub: "Saia", price: null, img: P + "IMG_0927.jpeg", crop: { s: 1.4, x: 50, y: 40 } },
  { id: 14, name: "Saia Midi de Cetim Preta", cat: "Shein", sub: "Saia", price: null, img: P + "IMG_0916.jpeg", crop: { s: 1.41, x: 40, y: 38 } },
  { id: 15, name: "Conjunto Listrado e Calções Bege", cat: "Shein", sub: "Conjunto", price: null, img: P + "IMG_0921.jpeg", crop: { s: 1.19, x: 50, y: 62.5 } },
  { id: 16, name: "Blusa Preta com Franzido Lateral", cat: "Shein", sub: "Blusa", price: null, img: P + "IMG_0925.jpeg", crop: { s: 1.37, x: 50, y: 22 } },
  { id: 17, name: "Camisa Listrada Azul", cat: "Shein", sub: "Blusa", price: null, img: P + "IMG_0922.jpeg", crop: { s: 1.22, x: 50, y: 0 } },
  { id: 18, name: "Blusa Cruzada Listrada", cat: "Shein", sub: "Blusa", price: null, img: P + "IMG_0914.jpeg", crop: { s: 1.3, x: 62, y: 33 } },
  { id: 19, name: "Top Castanho com Ombreiras", cat: "Shein", sub: "Blusa", price: null, img: P + "IMG_0902.jpeg", crop: { s: 1.08, x: 40, y: 40 } },
  { id: 20, name: "Top Vermelho Ombro Único", cat: "Shein", sub: "Blusa", price: null, img: P + "IMG_0901.jpeg", crop: { s: 1.28, x: 45, y: 45 } },
  { id: 21, name: "Body Branco de Ombro Único", cat: "Shein", sub: "Body", price: null, img: P + "IMG_0919.jpeg", crop: { s: 1.36, x: 62, y: 31.7 } },
  { id: 22, name: "Body Estampado Mármore", cat: "Shein", sub: "Body", price: null, img: P + "IMG_0912.jpeg", crop: { s: 1.35, x: 45, y: 32 } },
  { id: 23, name: "Body Corset Preto", cat: "Shein", sub: "Body", price: null, img: P + "IMG_0923.jpeg", crop: { s: 1.19, x: 50, y: 0 } },
  { id: 24, name: "Body Ombro Único (Preto e Castanho)", cat: "Shein", sub: "Body", price: null, img: P + "IMG_0898.jpeg", crop: { s: 1.12, x: 50, y: 100 } },
  { id: 25, name: "Calções Vermelhos de Cintura Alta", cat: "Shein", sub: "Calções", price: null, img: P + "IMG_0917.jpeg", crop: { s: 1.22, x: 50, y: 0 } },
  { id: 26, name: "Sandálias Brancas", cat: "Shein", sub: "Calçado", price: null, img: P + "IMG_0909.jpeg" },
  { id: 27, name: "Brincos Gota (3 pares)", cat: "Shein", sub: "Acessórios", price: null, img: P + "IMG_0915.jpeg", mask: "rgb(86, 59, 43)" },
  { id: 28, name: "Óculos de Sol Âmbar", cat: "Shein", sub: "Acessórios", price: null, img: P + "IMG_0920.jpeg", crop: { s: 1.32, x: 0, y: 20 } },
  { id: 29, name: "Óculos de Sol Dourados", cat: "Shein", sub: "Acessórios", price: null, img: P + "IMG_0906.jpeg", crop: { s: 1.08, x: 40, y: 40 } },
  { id: 30, name: "Mala Tote com Monograma", cat: "Shein", sub: "Acessórios", price: null, img: P + "IMG_0913.jpeg", crop: { s: 1.3, x: 50, y: 32 } },
  { id: 31, name: "Mala Tote Preta com Pompom", cat: "Shein", sub: "Acessórios", price: null, img: P + "IMG_0907.jpeg", crop: { s: 1.3, x: 50, y: 32 } },
  { id: 32, name: "Suporte de Ventosas para Telemóvel", cat: "Shein", sub: "Acessórios", price: null, img: P + "IMG_0924.jpeg", crop: { s: 1.08, x: 45, y: 45 } },
```
