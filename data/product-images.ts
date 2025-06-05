import { useEffect, useState } from "react";

// Lista de todas as cores possíveis
export const allColors = [
  "branco", "preto", "cinza", "azul-royal", "verde-maldivas", "azul-marinho",
  "azul-escura-15-3920", "verde-musgo-especial-18-5918", "vermelho-especial-19-1559",
  "vermelho-red-especial-19-1763", "azul-turquesa-especial-18-4252", "marrom-lead-especial-17-1118",
  "begue-serenidade-escura-11-0105", "rosa-adormecida-escura-18-2043", "cinza-estanho-escura-19-4014",
  "laranja-juice-16-1358", "begue-wood-especial-15-1308", "amarelo-sunshine-especial-14-1064",
  "rosa-lobster-16-1520", "verde-militar-k-18-0117", "vermelho-china-19-1650"
];

// Mapeamento das imagens por produto e cor
export const productImagesAndColors: Record<string, { color: string; src: string }[]> = {
  "camiseta-basica": [
    { color: "branco", src: "/img/camiseta-basica/branco.jpg" },
    { color: "preto", src: "/img/camiseta-basica/preto.jpg" },
    { color: "cinza", src: "/img/camiseta-basica/cinza.jpg" },
    // ...adicione todas as cores disponíveis para cada produto
  ],
  "oversized": [
    { color: "branco", src: "/img/oversized/branco.jpg" },
    { color: "preto", src: "/img/oversized/preto.jpg" },
    { color: "cinza", src: "/img/oversized/cinza.jpg" },
  ],
  // ...adicione outros produtos conforme necessário
};

// Caso precise usar hooks e lógica de montagem, coloque dentro de um componente React, por exemplo:

export function ProductImagesComponent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null; // ou um loading

  // ...adicione o restante do seu componente aqui
  return 
}