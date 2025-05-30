"use client"

import { useState } from "react"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { products } from "@/data/products" 
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CatalogPage() {
  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    categories: [] as string[],
    colors: [] as string[],
    sizes: [] as string[],
    isNew: false,
    isSeasonal: false,
  })

  // Filter options
  const categories = [
    { id: "camisetas", label: "Camisetas" },
    { id: "bermudas", label: "Bermudas" },
    { id: "moletons", label: "Moletons" },
    { id: "calcas", label: "Calças" },
    { id: "jaquetas", label: "Jaquetas" },
  ]

  const colors = [
    { id: "preto", label: "Preto" },
    { id: "branco", label: "Branco" },
    { id: "cinza", label: "Cinza" },
    { id: "azul", label: "Azul" },
    { id: "vermelho", label: "Vermelho" },
    { id: "bege", label: "Bege" },
  ]

  const sizes = ["PP", "P", "M", "G", "GG"]

  // Handlers
  const handleChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const list = prev[key] as string[]
      const newList = list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
      return { ...prev, [key]: newList }
    })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }))
  }

  const handleBooleanChange = (key: 'isNew' | 'isSeasonal') => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    // Busca por nome
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false
    // Filtro por categoria
    if (filters.categories.length && !filters.categories.includes(product.category)) return false
    // Filtro por cor
    if (filters.colors.length && !filters.colors.includes(product.color)) return false
    // Filtro por tamanho
    if (filters.sizes.length && !product.size.some((s: string) => filters.sizes.includes(s))) return false
    // Filtro por novo
    if (filters.isNew && !product.isNew) return false
    // Filtro por temporada
    if (filters.isSeasonal && !product.isSeasonal) return false
    return true
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para a página inicial
      </Link>

      <h1 className="text-3xl font-bold mb-8">Catálogo Completo</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h2 className="font-semibold text-lg mb-4">Filtros</h2>

            {/* Search */}
            <div className="mb-6">
              <Label htmlFor="search" className="mb-2 block">Buscar</Label>
              <Input
                id="search"
                placeholder="Buscar produtos..."
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>

            {/* Collections */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Coleções</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="filter-new"
                    checked={filters.isNew}
                    onCheckedChange={() => handleBooleanChange("isNew")}
                  />
                  <Label htmlFor="filter-new" className="ml-2 text-sm">Novos Produtos</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="filter-seasonal"
                    checked={filters.isSeasonal}
                    onCheckedChange={() => handleBooleanChange("isSeasonal")}
                  />
                  <Label htmlFor="filter-seasonal" className="ml-2 text-sm">Temporada</Label>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categorias</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filters.categories.includes(category.id)}
                      onCheckedChange={() => handleChange("categories", category.id)}
                    />
                    <Label htmlFor={`category-${category.id}`} className="ml-2 text-sm">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Cores</h3>
              <div className="space-y-2">
                {colors.map((color) => (
                  <div key={color.id} className="flex items-center">
                    <Checkbox
                      id={`color-${color.id}`}
                      checked={filters.colors.includes(color.id)}
                      onCheckedChange={() => handleChange("colors", color.id)}
                    />
                    <Label htmlFor={`color-${color.id}`} className="ml-2 text-sm">
                      {color.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Tamanhos</h3>
              <div className="space-y-2">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center">
                    <Checkbox
                      id={`size-${size}`}
                      checked={filters.sizes.includes(size)}
                      onCheckedChange={() => handleChange("sizes", size)}
                    />
                    <Label htmlFor={`size-${size}`} className="ml-2 text-sm">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                setFilters({
                  search: "",
                  categories: [],
                  colors: [],
                  sizes: [],
                  isNew: false,
                  isSeasonal: false,
                })
              }
            >
              Limpar filtros
            </Button>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum produto encontrado com os filtros selecionados.</p>
          )}
        </section>
      </div>

      <WhatsAppButton phoneNumber="5548991684860" />
    </main>
  )
}
