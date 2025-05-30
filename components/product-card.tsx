"use client"

import Link from "next/link"
import { ProductGallery } from "./product-gallery"
import type { Product } from "@/data/products"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produto/${product.slug}`}
      className="block group border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      <div className="mb-2">
        <ProductGallery
          productName={product.name}
          images={{
            front: product.images.front,
            back: product.images.back,
            variations: product.images.variations || [],
          }}
        />
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
