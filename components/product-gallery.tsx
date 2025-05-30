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
    <div className="space-y-4 w-full h-full">
      {/* Main Image */}
      <div className="relative w-full h-full min-h-[300px] bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={allImages[currentImage] || "/placeholder.svg"}
          alt={productName}
          fill
          className="object-cover w-full h-full"
          sizes="100vw"
          priority
        />

        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
              aria-label="Imagem anterior"
              type="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
              aria-label="Próxima imagem"
              type="button"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
