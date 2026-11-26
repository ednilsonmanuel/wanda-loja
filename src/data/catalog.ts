import { IMAGES_PATH } from "../config";

export type Cat = "Inuka" | "Shein";

/** Zoom (s) e ponto de ancoragem (x, y em %) usados para esconder marcas e selos nas capturas da Shein. */
export interface Crop {
  s: number;
  x: number;
  y: number;
}

export interface Product {
  id: number;
  name: string;
  cat: Cat;
  sub: string;
  /** Preço em MT. Use null para mostrar "Preço sob consulta". */
  price: number | null;
  /** Preço antigo (promoção). */
  old?: number;
  tag?: "Novo" | "Mais Vendido";
  /** Nome do ficheiro em public/images. */
  img: string;
  crop?: Crop;
  /** Cor para esbater o rodapé da foto (esconde selos da Shein). */
  mask?: string;
}

const P = IMAGES_PATH;

// Perfumes e cosméticos Inuka: fotos oficiais da marca. Preços dos ids 1-4 são de exemplo; os restantes estão por preencher (price: null).
// Moda Shein: fotos reais enviadas pela Wanda; preços por preencher (price: null). IMG_0985 a IMG_1005 já vêm recortadas (sem logótipos), por isso não precisam de crop.
export const PRODUCTS: Product[] = [
  { id: 1, name: "Eau de Parfum Rosa", cat: "Inuka", sub: "Perfume feminino", price: 1850, tag: "Mais Vendido", img: P + "inuka-rosa-floral.jpg" },
  { id: 2, name: "Perfume Masculino King", cat: "Inuka", sub: "Perfume masculino", price: 1950, tag: "Novo", img: P + "inuka-noir-azul-marinho.jpg" },
  { id: 3, name: "Difusores de Ambiente", cat: "Inuka", sub: "Difusor", price: 850, old: 1100, img: P + "inuka-difusores.jpg" },
  { id: 4, name: "Linha de Maquilhagem e Corpo", cat: "Inuka", sub: "Cosméticos", price: 1200, tag: "Mais Vendido", img: P + "inuka-linha-cosmeticos.jpg" },
  { id: 5, name: "Perfume Always With You", cat: "Inuka", sub: "Perfume feminino", price: null, img: P + "inuka-always-with-you.jpg" },
  { id: 6, name: "Perfume Vermelho", cat: "Inuka", sub: "Perfume feminino", price: null, tag: "Novo", img: P + "inuka-vermelho.jpg" },
  { id: 7, name: "Parfum Rosa (com caixa)", cat: "Inuka", sub: "Perfume feminino", price: null, img: P + "inuka-parfum-rosa-caixa.jpg" },
  { id: 8, name: "Perfume Frasco Redondo Preto", cat: "Inuka", sub: "Perfume masculino", price: null, img: P + "inuka-frasco-redondo-preto.jpg" },
  { id: 9, name: "Duo King & Lady Deluxe", cat: "Inuka", sub: "Perfume masculino", price: null, img: P + "inuka-king-lady-deluxe.jpg" },
  { id: 33, name: "Vestido Corset Vermelho com Drapeado", cat: "Shein", sub: "Vestido", price: null, tag: "Novo", img: P + "IMG_1005.jpeg" },
  { id: 34, name: "Vestido Branco Tubo com Estrela-do-mar", cat: "Shein", sub: "Vestido", price: null, img: P + "IMG_1004.jpeg" },
  { id: 35, name: "Vestido Branco Tubo Franzido", cat: "Shein", sub: "Vestido", price: null, img: P + "IMG_1003.jpeg" },
  { id: 36, name: "Vestido Midi Vermelho Justo", cat: "Shein", sub: "Vestido", price: null, img: P + "IMG_0999.jpeg" },
  { id: 37, name: "Vestido Branco Evasê com Pérolas", cat: "Shein", sub: "Vestido", price: null, tag: "Novo", img: P + "IMG_1001.jpeg" },
  { id: 38, name: "Vestido Verde Sereia Tubo", cat: "Shein", sub: "Vestido", price: null, tag: "Novo", img: P + "IMG_1002.jpeg" },
  { id: 39, name: "Vestido Longo Vermelho Plissado", cat: "Shein", sub: "Vestido", price: null, tag: "Novo", img: P + "IMG_0998.jpeg" },
  { id: 40, name: "Vestido Branco de Renda com Estrela-do-mar", cat: "Shein", sub: "Vestido", price: null, img: P + "IMG_0997.jpeg" },
  { id: 41, name: "Vestido Halter Branco Costas Abertas", cat: "Shein", sub: "Vestido", price: null, img: P + "IMG_0996.jpeg" },
  { id: 42, name: "Vestido Halter Branco com Argola Dourada", cat: "Shein", sub: "Vestido", price: null, tag: "Novo", img: P + "IMG_0995.jpeg" },
  { id: 43, name: "Vestido Branco Tubo com Babados", cat: "Shein", sub: "Vestido", price: null, img: P + "IMG_0994.jpeg" },
  { id: 44, name: "Vestido Bege Ombro Assimétrico", cat: "Shein", sub: "Vestido", price: null, img: P + "IMG_0993.jpeg" },
  { id: 45, name: "Saia-Calção Preta com Flor Dourada", cat: "Shein", sub: "Saia", price: null, img: P + "IMG_0992.jpeg" },
  { id: 46, name: "Bolsa Preta com Corrente", cat: "Shein", sub: "Acessórios", price: null, tag: "Novo", img: P + "IMG_0991.jpeg" },
  { id: 47, name: "Blusa Listrada com Laço Lateral", cat: "Shein", sub: "Blusa", price: null, img: P + "IMG_0990.jpeg" },
  { id: 48, name: "Vestido Amarelo com Babados", cat: "Shein", sub: "Vestido", price: null, tag: "Novo", img: P + "IMG_0989.jpeg" },
  { id: 49, name: "Mala de Palha com Alças Castanhas", cat: "Shein", sub: "Acessórios", price: null, img: P + "IMG_0988.jpeg" },
  { id: 50, name: "Pulseira Dourada", cat: "Shein", sub: "Acessórios", price: null, img: P + "IMG_0987.jpeg" },
  { id: 51, name: "Pólo Listrado Masculino", cat: "Shein", sub: "Masculino", price: null, img: P + "IMG_0986.jpeg" },
  { id: 52, name: "Top Branco Decote Quadrado", cat: "Shein", sub: "Blusa", price: null, img: P + "IMG_0985.jpeg" },
];

export const byId = (id: number) => PRODUCTS.find((p) => p.id === id)!;

export const cropStyle = (p: Product) =>
  p.crop ? { transform: `scale(${p.crop.s})`, transformOrigin: `${p.crop.x}% ${p.crop.y}%` } : undefined;
