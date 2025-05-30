"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ProductGallery } from "@/components/product-gallery"
import { products, } from "@/data/products"
import { ProductCard } from "@/components/product-card"

const allColors = [
	{ name: "Branco", code: "#fff" },
	{ name: "Azul Royal", code: "#4169e1" },
	{ name: "Verde Maldivas", code: "#00c7b7" },
	{ name: "Azul Marinho", code: "#1a237e" },
	{ name: "Preto", code: "#242424" },
	{ name: "Azul Escura - 15-3920", code: "#34568B" },
	{ name: "Verde Musgo Especial - 18-5918", code: "#4B6F44" },
	{ name: "Vermelho Especial 19 1559", code: "#9B2335" },
	{ name: "Vermelho Red Especial 19 1763", code: "#C72C48" },
	{ name: "Azul Turquesa Especial 18 4252", code: "#53B0AE" },
	{ name: "Marrom Lead Especial 17 1118", code: "#A7988A" },
	{ name: "Begue Serenidade Escura 11 0105", code: "#E6D3B3" },
	{ name: "Rosa Adormecida Escura - 18-2043", code: "#A26769" },
	{ name: "Cinza Estanho Escura - 19-4014", code: "#43464B" },
	{ name: "Laranja Juice 16 1358", code: "#FF8812" },
	{ name: "Begue Wood Especial 15 1308", code: "#D8CAB8" },
	{ name: "Amarelo Sunshine Especial 14 1064", code: "#FFDE59" },
	{ name: "Rosa Lobster 16 1520", code: "#E27396" },
	{ name: "Verde Militar K 18 0117", code: "#4B5320" },
	{ name: "Vermelho China 19 1650", code: "#BE0032" },
]

const allProducts = [
	{ value: "camiseta-basica", label: "Camiseta Básica" },
	{ value: "oversized", label: "Oversized" },
	{ value: "regata", label: "Regata" },
	{ value: "cropped", label: "Cropped" },
	{ value: "t-shirt", label: "T-shirt" },
	{ value: "bermuda-mauricinho", label: "Bermuda Mauricinho" },
	{ value: "moletom-canguru", label: "Moletom Canguru" },
	{ value: "moletom-careca", label: "Moletom Careca" },
	{ value: "calca-moletom", label: "Calça Moletom" },
	{ value: "corta-vento", label: "Corta Vento" },
]

type Props = {
	params: Promise<{ slug: string }>
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function ProductPage({ params, searchParams }: Props) {
	const { slug } = React.use(params)
	// Se precisar dos searchParams:
	// const resolvedSearchParams = searchParams ? React.use(searchParams) : undefined

	const product = products.find((p) => p.slug === slug)
	if (!product) return <div>Produto não encontrado.</div>

	const images = {
		front: product.images.front,
		back: product.images.back,
		variations: product.images.variations || [],
	}

	// Recomendações aleatórias apenas no client para evitar hydration error
	const [recommendations, setRecommendations] = useState<typeof products | null>(null)
	useEffect(() => {
		const filtered = products.filter((p) => p.slug !== slug)
		const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 4)
		setRecommendations(shuffled)
	}, [slug])

	// Estado para itens selecionados (tipo, tamanho, cor)
	const [items, setItems] = useState([
		{
			productType: product.slug,
			size: product.size[0],
			color: product.color,
			quantity: 1,
		},
	])

	// Adicionar novo item
	const addItem = () => {
		setItems((prev) => [
			...prev,
			{
				productType: product.slug,
				size: product.size[0],
				color: product.color,
				quantity: 1,
			},
		])
	}

	// Remover item
	const removeItem = (idx: number) => {
		setItems((prev) => prev.filter((_, i) => i !== idx))
	}

	// Atualizar campo do item
	const handleItemChange = (
		idx: number,
		key: "productType" | "size" | "color" | "quantity",
		value: string
	) => {
		setItems((prev) =>
			prev.map((item, i) =>
				i === idx ? { ...item, [key]: key === "quantity" ? Number(value) : value } : item
			)
		)
	}

	// Para cada item, buscar as opções de tamanho e cor do produto selecionado
	const getProductData = (slug: string) => products.find((p) => p.slug === slug)

	return (
		<main className="container mx-auto px-4 py-8">
			<Link
				href="/"
				className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
			>
				<ArrowLeft className="h-4 w-4 mr-2" />
				Voltar para a página inicial
			</Link>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
				<div className="w-full flex flex-col items-center">
					<div
						className="w-full max-w-[420px] aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mb-4 transition-all duration-300"
					>
						<ProductGallery images={images} productName={product.name} />
					</div>
					{/* Miniaturas das variações */}
					{images.variations.length > 0 && (
						<div className="flex gap-2 mt-2">
							{[images.front, images.back, ...images.variations].map((img, idx) => (
								<div key={idx} className="w-16 h-16 rounded overflow-hidden border bg-white flex items-center justify-center">
									<img
										src={img}
										alt={`${product.name} variação ${idx + 1}`}
										className="object-cover w-full h-full"
									/>
								</div>
							))}
						</div>
					)}
				</div>
				<div>
					<h1 className="text-3xl font-bold mb-2">{product.name}</h1>
					<p className="text-gray-600 mb-4">{product.description}</p>

					{/* Itens do produto: tipo, tamanho, cor */}
					<div className="mb-6">
						<span className="font-semibold">Monte seu kit:</span>
						<div className="space-y-4 mt-2">
							{items.map((item, idx) => {
								const prodData = getProductData(item.productType) || product
								return (
									<div key={idx} className="flex flex-wrap gap-2 items-center border-b pb-2">
										{/* Tipo de produto */}
										<select
											value={item.productType}
											onChange={e => handleItemChange(idx, "productType", e.target.value)}
											className="border rounded px-2 py-1 text-sm"
										>
											{allProducts.map((prod) => (
												<option key={prod.value} value={prod.value}>{prod.label}</option>
											))}
										</select>
										{/* Tamanho */}
										<select
											value={item.size}
											onChange={e => handleItemChange(idx, "size", e.target.value)}
											className="border rounded px-2 py-1 text-sm"
										>
											{(prodData.size || []).map((size: string) => (
												<option key={size} value={size}>{size}</option>
											))}
										</select>
										{/* Cor */}
										<select
											value={item.color}
											onChange={e => handleItemChange(idx, "color", e.target.value)}
											className="border rounded px-2 py-1 text-sm"
										>
											{allColors.map((color) => (
												<option key={color.name} value={color.name}>{color.name}</option>
											))}
										</select>
										{items.length > 1 && (
											<Button
												type="button"
												variant="destructive"
												size="icon"
												onClick={() => removeItem(idx)}
												title="Remover item"
											>
												×
											</Button>
										)}
									</div>
								)
							})}
							<Button type="button" variant="outline" onClick={addItem}>
								+ Adicionar item
							</Button>
						</div>
					</div>

					<div className="text-2xl font-semibold mb-6">
						R$ {product.price.toFixed(2)}
					</div>
					<Button asChild>
						<a
							href={`https://wa.me/5548991684860?text=Olá! Tenho interesse nos seguintes itens: ${items.map((item, idx) => `\n${idx + 1}. Produto: ${allProducts.find(p => p.value === item.productType)?.label || item.productType}, Tamanho: ${item.size}, Cor: ${item.color}`).join("")}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							Comprar pelo WhatsApp
						</a>
					</Button>
				</div>
			</div>

			{/* Barra de recomendações */}
			<section className="mt-16">
				<h2 className="text-xl font-bold mb-4">Você também pode gostar</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
					{recommendations && recommendations.map((rec) => (
						<ProductCard key={rec.id} product={rec} />
					))}
				</div>
			</section>

			<section className="mt-16">
				<h2 className="text-xl font-bold mb-4">Todas as cores disponíveis para personalização</h2>
				<div className="flex flex-wrap gap-3">
					{allColors.map((color) => (
						<div key={color.name} className="flex flex-col items-center">
							<div
								className="w-7 h-7 rounded-full border-2 border-gray-300 mb-1"
								style={{ background: color.code }}
								title={color.name}
							/>
							<span className="text-xs text-gray-700 text-center max-w-[80px]">{color.name}</span>
						</div>
					))}
				</div>
			</section>

			<WhatsAppButton phoneNumber="5548991684860" />
		</main>
	)
}
