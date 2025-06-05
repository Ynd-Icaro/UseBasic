'use client'
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { Product } from "@/types/Product"

type Props = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Basic Clothing
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Início
          </Link>
          <Link href="/catalogo" className="hover:text-gray-600 transition-colors">
            Catálogo
          </Link>
          <Link href="/pedido-personalizado" className="hover:text-gray-600 transition-colors">
            Pedido Personalizado
          </Link>
          <Link href="#" className="hover:text-gray-600 transition-colors">
            Sobre Nós
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="hover:text-gray-600 transition-colors">
                Início
              </Link>
              <Link href="/catalogo" className="hover:text-gray-600 transition-colors">
                Catálogo
              </Link>
              <Link href="/pedido-personalizado" className="hover:text-gray-600 transition-colors">
                Pedido Personalizado
              </Link>
              <Link href="#" className="hover:text-gray-600 transition-colors">
                Sobre Nós
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default function ProductPage({ params, searchParams }: Props) {
  const { slug } = params;
  const [products, setProducts] = useState<Product[]>([])
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Fetch products from API or any other source
    const fetchProducts = async () => {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter((p) => p.slug !== slug)
    const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 4)
    setRecommendations(shuffled)
  }, [slug, products])

  return (
    <div>
      {/* ...outro conteúdo da página... */}

      {mounted && recommendations && recommendations.map((product) => (
        <div key={product.id}>
          {/* Renderizar produto recomendado */}
        </div>
      ))}

      {/* ...outro conteúdo da página... */}
    </div>
  )
}
