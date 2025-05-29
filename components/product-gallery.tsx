"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryProps {
  productName: string
  images: {
    front: string
    back: string
    variations: string[]
  }
}

export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const allImages = [images.front, images.back, ...images.variations]
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
        <Image src={allImages[currentImage] || "/placeholder.svg"} alt={productName} fill className="object-cover" />

        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                currentImage === index ? "border-[#242424]" : "border-gray-200"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Labels */}
      <div className="text-center text-sm text-gray-500">
        {currentImage === 0 && "Frente"}
        {currentImage === 1 && "Costas"}
        {currentImage > 1 && `Variação ${currentImage - 1}`}
      </div>
    </div>
  )
}
