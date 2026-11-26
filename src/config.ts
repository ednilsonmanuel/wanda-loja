/** Número de WhatsApp da loja (código do país + número, sem "+"). Defina em .env: VITE_WHATSAPP_NUMBER. */
export const WHATSAPP_NUMBER: string =
  import.meta.env.VITE_WHATSAPP_NUMBER || "258840000000";

/** Pasta das imagens (public/images). Usa BASE_URL para funcionar no GitHub Pages. */
export const IMAGES_PATH = `${import.meta.env.BASE_URL}images/`;
