"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Product } from "../data/product-types"
import { getProductImagesAndColors, CORES_HEX } from "@/data/image-utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Cores que devem aparecer no card
const CARD_COLORS = [
  "preta", "branco", "cinza", "verde", "vermelho"
]

export function ProductCard({ product }: { product: Product }) {
  // Busca as imagens e cores do produto
  const imagesAndColors = getProductImagesAndColors(product.slug)
    .filter(img => CARD_COLORS.some(cor => img.color.includes(cor)))
    .slice(0, 5)

  // Estado para cor e lado selecionados
  const [selectedColor, setSelectedColor] = useState(imagesAndColors[0]?.color || CARD_COLORS[0])
  const [isBack, setIsBack] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true); }, [])

  // Função para obter a imagem correta
  const getImage = () => {
    const base = `/img/camiseta-basica-${selectedColor}-${isBack ? "costas" : "frente"}.webp`
    return imagesAndColors.find(img => img.color === selectedColor)?.src.replace("frente", isBack ? "costas" : "frente") || base
  }

  // Impede navegação ao clicar nos controles
  const stopPropagation = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <Link
      href={`/produto/${product.slug}`}
      className="block group border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      <div className="mb-2 flex flex-col items-center">
        {/* Imagem principal com setas */}
        <div className="relative w-full max-w-[220px] aspect-square flex items-center justify-center mb-2">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 z-10"
            onClick={e => { stopPropagation(e); setIsBack(false); }}
            tabIndex={0}
            aria-label="Frente"
            type="button"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <img
            src={getImage()}
            alt={selectedColor}
            className="object-contain w-full h-full rounded bg-white"
            onError={e => { (e.target as HTMLImageElement).src = "/img/placeholder.jpg" }}
          />
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 z-10"
            onClick={e => { stopPropagation(e); setIsBack(true); }}
            tabIndex={0}
            aria-label="Costas"
            type="button"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        {/* Cores disponíveis */}
        <div className="flex space-x-2 mb-2">
          {imagesAndColors.map(img => (
            <button
              key={img.color}
              onClick={() => setSelectedColor(img.color)}
              className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === img.color ? "ring-2 ring-offset-2 ring-indigo-500" : "border-transparent"}`}
              style={{ backgroundColor: CORES_HEX[img.color as keyof typeof CORES_HEX] }}
              aria-label={img.color}
            >
              {selectedColor === img.color && (
                <span className="w-3 h-3 bg-white rounded-full" />
              )}
            </button>
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
      {mounted && (
        <section>
          {/* ...conteúdo dinâmico... */}
        </section>
      )}
    </Link>
  )
}
