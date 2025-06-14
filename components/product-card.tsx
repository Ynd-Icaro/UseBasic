"use client";

import Link from "next/link";
import { useState } from "react";
import { Product } from "../data/product-types";
import { getProductImagesAndColors, CORES_HEX } from "@/data/image-utils";

const CARD_COLORS = [
  "preta", "branca", "cinza", "verde", "vermelho"
];

export function ProductCard({ product }: { product: Product }) {
  const imagesAndColors = getProductImagesAndColors(product.slug)
    .filter(img => CARD_COLORS.some(cor => img.color.includes(cor)))
    .slice(0, 5);

  const [selectedColor, setSelectedColor] = useState(imagesAndColors[0]?.color || CARD_COLORS[0]);
  const [showBack, setShowBack] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const displayColor = hoveredColor || selectedColor;
  const selectedImageObj = imagesAndColors.find(img => img.color === displayColor);

  // Alterna entre frente/costas ao clicar na imagem
  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowBack((prev) => !prev);
  };

  // Ao passar o mouse, mostra costas; ao sair, volta para frente
  const handleMouseEnter = () => setShowBack(true);
  const handleMouseLeave = () => setShowBack(false);

  return (
    <Link
      href={`/produto/${product.slug}`}
      className="block group border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      <div className="mb-2 flex flex-col items-center">
        <div
          className="relative w-full max-w-[220px] aspect-square flex items-center justify-center mb-2 cursor-pointer"
          onClick={handleImageClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={
              showBack
                ? selectedImageObj?.back || selectedImageObj?.src
                : selectedImageObj?.src
            }
            alt={displayColor}
            className="object-contain w-full h-full rounded bg-white"
            onError={e => { (e.target as HTMLImageElement).src = "/img/placeholder.webp" }}
          />
        </div>
        {/* Nome do produto */}
        <div className="font-semibold text-base mb-1 text-center">{product.name}</div>
        {/* Círculos de cor */}
        <div className="flex space-x-2 mb-2">
          {imagesAndColors.map(img => (
            <div
              key={img.color}
              className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer
                ${displayColor === img.color ? "ring-2 ring-offset-2 ring-indigo-500" : "border-transparent"}`}
              style={{ backgroundColor: CORES_HEX[img.color as keyof typeof CORES_HEX] }}
              aria-label={img.color}
              onMouseEnter={() => setHoveredColor(img.color)}
              onMouseLeave={() => setHoveredColor(null)}
              onClick={e => {
                e.preventDefault();
                setSelectedColor(img.color);
              }}
              title={img.color}
            />
          ))}
        </div>
        {/* Mensagem de quantidade mínima */}
        <div className="text-xs text-gray-500 mb-2 text-center">
          Pedido mínimo: 10 unidades
        </div>
      </div>
    </Link>
  );
}
