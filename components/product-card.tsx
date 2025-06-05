"use client"

import Link from "next/link"
import { getProductImagesAndColors } from "@/data/image-utils";
import { useState } from "react";

interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  isNew?: boolean;
  isSeasonal?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imagesAndColors = getProductImagesAndColors(product.slug);
  const [selectedColor, setSelectedColor] = useState(imagesAndColors[0]?.color || "");
  const selectedImageObj = imagesAndColors.find(img => img.color === selectedColor);
  const imageToShow = selectedImageObj?.src || imagesAndColors[0]?.src || "/img/placeholder.jpg";

  return (
    <Link
      href={`/produto/${product.slug}`}
      className="block group border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      <div className="relative w-full aspect-[3/4] bg-gray-100">
        <img
          src={imageToShow}
          alt={selectedColor}
          className="object-cover w-full h-full"
        />
        {/* Bolinhas de cor clicáveis */}
        <div className="absolute bottom-2 left-2 flex gap-2">
          {imagesAndColors.map((img) => (
            <button
              key={img.color}
              type="button"
              className={`w-5 h-5 rounded-full border-2 ${selectedColor === img.color ? "border-black" : "border-gray-300"}`}
              style={{
                background: `url(${img.src}) center/cover no-repeat`
              }}
              title={img.color}
              onClick={e => {
                e.preventDefault();
                setSelectedColor(img.color);
              }}
            />
          ))}
        </div>
      </div>
      <div className="px-4 pb-4">
        <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
        <div className="text-gray-600 text-sm mb-1 capitalize">{product.category}</div>
        <div className="font-bold text-xl mb-2">R$ {product.price.toFixed(2)}</div>
        {product.isNew && (
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">
            Novo
          </span>
        )}
        {product.isSeasonal && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            Temporada
          </span>
        )}
      </div>
    </Link>
  )
}
