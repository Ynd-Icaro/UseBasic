import type { Product } from "../../data/product-types"

// Não exporte type aqui! Apenas os dados.

export const products: Product[] = [
  {
    id: 1,
    name: "Camiseta Básica",
    price: 49.9,
    description: "Camiseta básica de alta qualidade, confeccionada em 100% algodão. Perfeita para o dia a dia, confortável e durável.",
    images: {
      front: "/img/camiseta-basica-frente.jpg",
      back: "/img/camiseta-basica-costas.jpg",
      variations: []
    },
    slug: "camiseta-basica",
    category: "camisetas",
    color: "preto",
    size: ["PP", "P", "M", "G", "GG"],
    isNew: true,
    isSeasonal: false,
  },
  {
    id: 2,
    name: "Oversized",
    price: 69.9,
    description: "Camiseta oversized com caimento perfeito. Estilo moderno e confortável para diversas ocasiões.",
    images: {
      front: "/img/oversized-frente.jpg",
      back: "/img/oversized-costas.jpg",
      variations: []
    },
    slug: "oversized",
    category: "camisetas",
    color: "preto",
    size: ["P", "M", "G", "GG"],
    isNew: true,
    isSeasonal: true,
  },
  {
    id: 3,
    name: "Regata",
    price: 39.9,
    description: "Regata básica ideal para dias quentes. Tecido leve e confortável que proporciona liberdade de movimento.",
    images: {
      front: "/img/regata-frente.jpg",
      back: "/img/regata-costas.jpg",
      variations: []
    },
    slug: "regata",
    category: "camisetas",
    color: "cinza",
    size: ["PP", "P", "M", "G"],
    isNew: false,
    isSeasonal: true,
  },
  {
    id: 4,
    name: "Cropped",
    price: 45.9,
    description: "Cropped moderno e versátil. Combina com diversos looks e estilos.",
    images: {
      front: "/img/cropped-frente.jpg",
      back: "/img/cropped-costas.jpg",
      variations: []
    },
    slug: "cropped",
    category: "camisetas",
    color: "branco",
    size: ["PP", "P", "M"],
    isNew: false,
    isSeasonal: false,
  },
  {
    id: 5,
    name: "T-shirt",
    price: 59.9,
    description: "T-shirt com design exclusivo. Conforto e estilo em uma única peça.",
    images: {
      front: "/img/t-shirt-frente.jpg",
      back: "/img/t-shirt-costas.jpg",
      variations: []
    },
    slug: "t-shirt",
    category: "camisetas",
    color: "branco",
    size: ["P", "M", "G", "GG"],
    isNew: true,
    isSeasonal: false,
  },
  {
    id: 6,
    name: "Bermuda Mauricinho",
    price: 79.9,
    description: "Bermuda estilo mauricinho, perfeita para ocasiões casuais. Confortável e estilosa.",
    images: {
      front: "/img/bermuda-mauricinho-frente.jpg",
      back: "/img/bermuda-mauricinho-costas.jpg",
      variations: []
    },
    slug: "bermuda-mauricinho",
    category: "bermudas",
    color: "bege",
    size: ["P", "M", "G", "GG"],
    isNew: false,
    isSeasonal: true,
  },
  {
    id: 7,
    name: "Moletom Canguru",
    price: 129.9,
    description: "Moletom canguru com capuz e bolso frontal. Ideal para dias frios, confortável e quentinho.",
    images: {
      front: "/img/moletom-canguru-frente.jpg",
      back: "/img/moletom-canguru-costas.jpg",
      variations: []
    },
    slug: "moletom-canguru",
    category: "moletons",
    color: "preto",
    size: ["P", "M", "G", "GG"],
    isNew: true,
    isSeasonal: true,
  },
  {
    id: 8,
    name: "Moletom Careca",
    price: 119.9,
    description: "Moletom careca com design minimalista. Perfeito para um visual casual e confortável.",
    images: {
      front: "/img/moletom-careca-frente.jpg",
      back: "/img/moletom-careca-costas.jpg",
      variations: []
    },
    slug: "moletom-careca",
    category: "moletons",
    color: "cinza",
    size: ["P", "M", "G"],
    isNew: false,
    isSeasonal: true,
  },
  {
    id: 9,
    name: "Calça Moletom",
    price: 99.9,
    description: "Calça moletom confortável e versátil. Ideal para momentos de lazer e conforto.",
    images: {
      front: "/img/calca-moletom-frente.jpg",
      back: "/img/calca-moletom-costas.jpg",
      variations: []
    },
    slug: "calca-moletom",
    category: "calcas",
    color: "preto",
    size: ["P", "M", "G", "GG"],
    isNew: false,
    isSeasonal: true,
  },
  {
    id: 10,
    name: "Corta Vento",
    price: 149.9,
    description: "Corta vento leve e resistente. Proteção contra vento e chuva leve com estilo.",
    images: {
      front: "/img/corta-vento-frente.jpg",
      back: "/img/corta-vento-costas.jpg",
      variations: []
    },
    slug: "corta-vento",
    category: "jaquetas",
    color: "vermelho",
    size: ["M", "G", "GG"],
    isNew: true,
    isSeasonal: false,
  },
]