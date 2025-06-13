// Mapeamento manual das cores e nomes para o padrão de imagem
const CORES = [
  "branca",
  "preta",
  "cinza-estanho",
  "azul-royal",
  "azul-marinho",
  "azul-escura",
  "verde-musgo",
  "amarelo-sunshine",
  "vermelho-china",
  "vermelho-especial",
  "vermelho-red",
  "azul-turquesa",
  "marrom-lead",
  "begue-serenidade",
  "rosa-adormecida",
  "laranja-juice",
  "begue-wood",
  "rosa-lobster",
  "verde-maldivas",
  "verde-militar",
  // Adicione aqui novos nomes de cores/arquivos conforme forem adicionados na pasta /public/img
];

export function getProductImagesAndColors(slug: string) {
  if (slug === "camiseta-basica") {
    return CORES.map((color) => ({
      color,
      src: `/img/camiseta-basica-${color}-frente.webp`
    }))
  }
    if (slug === "Bermuda-Mauricinho") {
    return CORES.map((color) => ({
      color,
      src: `/img/bermuda-mauricinho-${color}-frente.webp`
    }))
  } 
  if (slug === "moletom-careca") {
    return CORES.map((color) => ({
      color,
      src: `/img/moletom-careca-${color}-frente.webp`
    }))
  }
  if (slug === "calca-moletom") {
    return CORES.map((color) => ({
      color,
      src: `/img/calca-moletom-${color}-frente.webp`
    }))
  }
  if (slug === "Corta-vento") {
    return CORES.map((color) => ({
      color,
      src: `/img/Corta-vento-${color}-frente.webp`
    }))
  }
  return [];
}

export const CORES_HEX: Record<string, string> = {
  "branca": "#fff",
  "preta": "#242424",
  "cinza-estanho": "#43464B",
  "azul-royal": "#4169e1",
  "azul-marinho": "#1a237e",
  "azul-escura": "#34568B",
  "verde-musgo": "#4B6F44",
  "amarelo-sunshine": "#FFDE59",
  "vermelho-china": "#BE0032",
  "vermelho-especial": "#9B2335",
  "vermelho-red": "#C72C48",
  "azul-turquesa": "#53B0AE",
  "marrom-lead": "#A7988A",
  "begue-serenidade": "#E6D3B3", 
  "rosa-adormecida": "#A26769",
  "laranja-juice": "#FF8812",
  "begue-wood": "#D8CAB8",
  "rosa-lobster": "#E27396",
  "verde-maldivas": "#00c7b7",
  "verde-militar": "#4B5320",
};