// Mapeamento manual das cores e nomes para o padrão de imagem
const CAMISA_BASICA_CORES = [
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
    return CAMISA_BASICA_CORES.map((color) => ({
      color,
      src: `/img/Camiseta-Basica-${color}-Frente.webp`
    }));
  }
  return [];
}
""
