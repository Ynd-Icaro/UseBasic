"use client"

import Image from "next/image"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  image: string
  slug: string
}

export function ProductCard({ product }: { product: Product }) {
  // Mapear imagens reais para os produtos
  const getProductImage = (productName: string) => {
  
    switch (productName.toLowerCase()) {
      case "camiseta básica":
        return "/camiseta-basica.jpg"
      default:
        return product.image || "/placeholder.svg"
    }
  }

  return (
    <div className="group">
      <Link href={`/produto/${product.slug}`}>
        <div className="overflow-hidden rounded-lg bg-gray-100 mb-3">
          <Image
            src={getProductImage(product.name) || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={400}
            className="h-[300px] w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <h3 className="text-lg font-medium">{product.name}</h3>
      </Link>
    </div>
  )
}
