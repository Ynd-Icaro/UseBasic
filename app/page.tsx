'use client';

import Link from "next/link"
import Image from "next/image"
import { ProductCard } from "@/components/product-card"
import { Banner } from "@/components/banner"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Camiseta Básica",
      price: 49.9,
      image: "/placeholder.svg?height=400&width=300",
      slug: "camiseta-basica",
    },
    {
      id: 2,
      name: "Oversized",
      price: 69.9,
      image: "/placeholder.svg?height=400&width=300",
      slug: "oversized",
    },
    {
      id: 3,
      name: "Regata",
      price: 39.9,
      image: "/placeholder.svg?height=400&width=300",
      slug: "regata",
    },
    {
      id: 4,
      name: "Cropped",
      price: 45.9,
      image: "/placeholder.svg?height=400&width=300",
      slug: "cropped",
    },
    {
      id: 5,
      name: "T-shirt",
      price: 59.9,
      image: "/placeholder.svg?height=400&width=300",
      slug: "t-shirt",
    },
    {
      id: 6,
      name: "Bermuda Mauricinho",
      price: 79.9,
      image: "/placeholder.svg?height=400&width=300",
      slug: "bermuda-mauricinho",
    },
    {
      id: 7,
      name: "Moletom Canguru",
      price: 129.9,
      image: "/placeholder.svg?height=400&width=300",
      slug: "moletom-canguru",
    },
    {
      id: 8,
      name: "Moletom Careca",
      price: 119.9,
      image: "/placeholder.svg?height=400&width=300",
      slug: "moletom-careca",
    },
    {
      id: 9,
      name: "Calça Moletom",
      price: 99.9,
      image: "/placeholder.svg?height=400&width=300",
      slug: "calca-moletom",
    },
    {
      id: 10,
      name: "Corta Vento",
      price: 149.9,
      image: "/placeholder.svg?height=400&width=300",
      slug: "corta-vento",
    },
  ]

  const banners = [
    {
      id: 1,
      title: "Nova Coleção",
      description: "Confira as novidades da temporada",
      image: "/placeholder.svg?height=600&width=1200",
      link: "/catalogo?isNew=true",
    },
    {
      id: 2,
      title: "Temporada de Inverno",
      description: "Peças quentes para os dias frios",
      image: "/placeholder.svg?height=600&width=1200",
      link: "/catalogo?isSeasonal=true",
    },
    {
      id: 3,
      title: "Promoção Especial",
      description: "Descontos imperdíveis",
      image: "/placeholder.svg?height=600&width=1200",
      link: "/catalogo",
    },
  ]

  const seasonalCards = [
    {
      id: 1,
      title: "Novas Peças",
      image: "/placeholder.svg?height=300&width=400",
      link: "/catalogo?isNew=true",
    },
    {
      id: 2,
      title: "Temporada de Inverno",
      image: "/placeholder.svg?height=300&width=400",
      link: "/catalogo?isSeasonal=true",
    },
    {
      id: 3,
      title: "Coleção Especial",
      image: "/placeholder.svg?height=300&width=400",
      link: "/catalogo?categories=moletons",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <Banner banners={banners} />

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Coleções em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {seasonalCards.map((card) => (
            <Link href={card.link} key={card.id} className="block">
              <div className="relative h-48 overflow-hidden rounded-lg">
                <Image
                  src={card.image || "/placeholder.svg"}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-white text-xl font-semibold p-4">{card.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Produtos Populares</h2>
          <Link href="/catalogo" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center">
            Ver catálogo completo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/catalogo" className="bg-[#242424] text-white px-8 py-3 rounded-full hover:bg-[#333] transition">
            Ver Todos os Produtos
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Como Funciona</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Envie sua arte ou ideia.</li>
              <li>Escolha modelo, cor e tamanho.</li>
              <li>Produzimos e entregamos em poucos dias.</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">Formatos Aceitos</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>PNG (fundo transparente)</li>
              <li>JPG, JPEG</li>
              <li>PDF (alta qualidade)</li>
              <li>PSD, AI (opcional)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/pedido-personalizado"
            className="bg-[#242424] text-white px-8 py-3 rounded-full hover:bg-[#333] transition"
          >
            Solicitar Personalização
          </Link>
        </div>
      </section>

      <div className="bg-[#242424] text-white py-6 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">Informações Importantes</h2>
          <p className="mb-2">• Quantidade mínima para encomendas: 10 produtos</p>
          <p className="mb-2">• Tamanhos disponíveis para encomendas: PP ao G4</p>
          <p className="mb-2">• Tamanhos disponíveis em estoque: PP ao GG</p>
          <p className="mb-2">• Entre em contato via WhatsApp para realizar seu pedido: +55 48 99168-4860</p>
        </div>
      </div>

      <WhatsAppButton phoneNumber="5548991684860" />
    </main>
  )
}
