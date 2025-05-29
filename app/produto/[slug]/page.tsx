"use client"

import type React from "react"
import { use, useState, useEffect } from "react"

import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ProductGallery } from "@/components/product-gallery"

const products = [
	{
		id: 1,
		name: "Camiseta Básica",
		price: 49.9,
		description:
			"Camiseta básica de alta qualidade, confeccionada em 100% algodão. Perfeita para o dia a dia, confortável e durável.",
		images: {
			front: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
			back: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
			variations: [
				"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
				"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
			],
		},
		slug: "camiseta-basica",
	},
	{
		id: 2,
		name: "Oversized",
		price: 69.9,
		description:
			"Camiseta oversized com caimento perfeito. Estilo moderno e confortável para diversas ocasiões.",
		images: {
			front: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
			back: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
			variations: [
				"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
				"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
			],
		},
		slug: "oversized",
	},
	{
		id: 3,
		name: "Regata",
		price: 39.9,
		description:
			"Regata básica ideal para dias quentes. Tecido leve e confortável que proporciona liberdade de movimento.",
		images: {
			front: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
			back: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
			variations: [
				"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
				"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
			],
		},
		slug: "regata",
	},
	{
		id: 4,
		name: "Cropped",
		price: 45.9,
		description:
			"Cropped moderno e versátil. Combina com diversos looks e estilos.",
		images: {
			front: "/placeholder.svg?height=600&width=400&text=Cropped+Frente",
			back: "/placeholder.svg?height=600&width=400&text=Cropped+Costas",
			variations: [
				"/placeholder.svg?height=600&width=400&text=Cropped+Cinza",
				"/placeholder.svg?height=600&width=400&text=Cropped+Preto",
			],
		},
		slug: "cropped",
	},
	{
		id: 5,
		name: "T-shirt",
		price: 59.9,
		description:
			"T-shirt com design exclusivo. Conforto e estilo em uma única peça.",
		images: {
			front: "/placeholder.svg?height=600&width=400&text=T-shirt+Frente",
			back: "/placeholder.svg?height=600&width=400&text=T-shirt+Costas",
			variations: [
				"/placeholder.svg?height=600&width=400&text=T-shirt+Cinza",
				"/placeholder.svg?height=600&width=400&text=T-shirt+Preta",
			],
		},
		slug: "t-shirt",
	},
	{
		id: 6,
		name: "Bermuda Mauricinho",
		price: 79.9,
		description:
			"Bermuda estilo mauricinho, perfeita para ocasiões casuais. Confortável e estilosa.",
		images: {
			front: "/placeholder.svg?height=600&width=400&text=Bermuda+Frente",
			back: "/placeholder.svg?height=600&width=400&text=Bermuda+Costas",
			variations: [
				"/placeholder.svg?height=600&width=400&text=Bermuda+Bege",
				"/placeholder.svg?height=600&width=400&text=Bermuda+Azul",
			],
		},
		slug: "bermuda-mauricinho",
	},
	{
		id: 7,
		name: "Moletom Canguru",
		price: 129.9,
		description:
			"Moletom canguru com capuz e bolso frontal. Ideal para dias frios, confortável e quentinho.",
		images: {
			front: "/placeholder.svg?height=600&width=400&text=Moletom+Canguru+Frente",
			back: "/placeholder.svg?height=600&width=400&text=Moletom+Canguru+Costas",
			variations: [
				"/placeholder.svg?height=600&width=400&text=Moletom+Canguru+Cinza",
				"/placeholder.svg?height=600&width=400&text=Moletom+Canguru+Azul",
			],
		},
		slug: "moletom-canguru",
	},
	{
		id: 8,
		name: "Moletom Careca",
		price: 119.9,
		description:
			"Moletom careca com design minimalista. Perfeito para um visual casual e confortável.",
		images: {
			front: "/placeholder.svg?height=600&width=400&text=Moletom+Careca+Frente",
			back: "/placeholder.svg?height=600&width=400&text=Moletom+Careca+Costas",
			variations: [
				"/placeholder.svg?height=600&width=400&text=Moletom+Careca+Preto",
				"/placeholder.svg?height=600&width=400&text=Moletom+Careca+Cinza",
			],
		},
		slug: "moletom-careca",
	},
	{
		id: 9,
		name: "Calça Moletom",
		price: 99.9,
		description:
			"Calça moletom confortável e versátil. Ideal para momentos de lazer e conforto.",
		images: {
			front: "/placeholder.svg?height=600&width=400&text=Calça+Moletom+Frente",
			back: "/placeholder.svg?height=600&width=400&text=Calça+Moletom+Costas",
			variations: [
				"/placeholder.svg?height=600&width=400&text=Calça+Preta",
				"/placeholder.svg?height=600&width=400&text=Calça+Cinza",
			],
		},
		slug: "calca-moletom",
	},
	{
		id: 10,
		name: "Corta Vento",
		price: 149.9,
		description:
			"Corta vento leve e resistente. Proteção contra vento e chuva leve com estilo.",
		images: {
			front: "/placeholder.svg?height=600&width=400&text=Corta+Vento+Frente",
			back: "/placeholder.svg?height=600&width=400&text=Corta+Vento+Costas",
			variations: [
				"/placeholder.svg?height=600&width=400&text=Corta+Vento+Vermelho",
				"/placeholder.svg?height=600&width=400&text=Corta+Vento+Azul",
			],
		},
		slug: "corta-vento",
	},
]

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = use(params)
	const product = products.find((p) => p.slug === slug)
	const [size, setSize] = useState("M")
	const [quantity, setQuantity] = useState(10)
	const [color, setColor] = useState("Preto")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState(false)
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!product) {
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
				<Link href="/" className="text-blue-600 hover:underline">
					Voltar para a página inicial
				</Link>
			</div>
		)
	}

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number.parseInt(e.target.value)
		setQuantity(value)
		if (value < 10) {
			setError("A quantidade mínima é de 10 produtos")
		} else {
			setError("")
		}
	}

	const handleOrder = () => {
		if (quantity < 10) {
			setError("A quantidade mínima é de 10 produtos")
			return
		}

		const message = `Olá! Gostaria de encomendar ${quantity} unidades do produto ${product.name} no tamanho ${size} e na cor ${color}.`
		const encodedMessage = encodeURIComponent(message)
		const whatsappUrl = `https://wa.me/5548991684860?text=${encodedMessage}`

		setSuccess(true)
		setTimeout(() => {
			window.open(whatsappUrl, "_blank")
			setSuccess(false)
		}, 1500)
	}

	return (
		<main className="container mx-auto px-4 py-8">
			<Link
				href="/"
				className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
			>
				<ArrowLeft className="h-4 w-4 mr-2" />
				Voltar para o catálogo
			</Link>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{isClient && <ProductGallery productName={product.name} images={product.images} />}

				<div>
					<h1 className="text-3xl font-bold mb-2">{product.name}</h1>
					<p className="text-2xl font-semibold mb-4">
						R$ {product.price.toFixed(2)}
					</p>
					<p className="text-gray-700 mb-6">{product.description}</p>

					<div className="space-y-6">
						<div>
							<Label
								htmlFor="size"
								className="text-base font-medium"
							>
								Tamanho
							</Label>
							<RadioGroup
								id="size"
								value={size}
								onValueChange={setSize}
								className="flex flex-wrap gap-2 mt-2"
							>
								{["PP", "P", "M", "G", "GG"].map((s) => (
									<div key={s} className="flex items-center">
										<RadioGroupItem
											value={s}
											id={`size-${s}`}
											className="peer sr-only"
										/>
										<Label
											htmlFor={`size-${s}`}
											className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 peer-data-[state=checked]:bg-[#242424] peer-data-[state=checked]:text-white cursor-pointer"
										>
											{s}
										</Label>
									</div>
								))}
							</RadioGroup>
							<p className="text-sm text-gray-500 mt-1">
								* Tamanhos disponíveis para encomenda: PP ao G4
							</p>
						</div>

						<div>
							<Label
								htmlFor="color"
								className="text-base font-medium"
							>
								Cor
							</Label>
							<RadioGroup
								id="color"
								value={color}
								onValueChange={setColor}
								className="flex flex-wrap gap-2 mt-2"
							>
								{["Preto", "Branco", "Cinza", "Azul", "Vermelho"].map((c) => (
									<div key={c} className="flex items-center">
										<RadioGroupItem
											value={c}
											id={`color-${c}`}
											className="peer sr-only"
										/>
										<Label
											htmlFor={`color-${c}`}
											className="flex px-4 h-10 items-center justify-center rounded-md border border-gray-200 peer-data-[state=checked]:bg-[#242424] peer-data-[state=checked]:text-white cursor-pointer"
										>
											{c}
										</Label>
									</div>
								))}
							</RadioGroup>
						</div>

						<div>
							<Label
								htmlFor="quantity"
								className="text-base font-medium"
							>
								Quantidade
							</Label>
							<div className="mt-2">
								<Input
									id="quantity"
									type="number"
									min={1}
									value={quantity}
									onChange={handleQuantityChange}
									className="w-24"
								/>
							</div>
							{error && (
								<p className="text-red-500 text-sm mt-1">{error}</p>
							)}
							<p className="text-sm text-gray-500 mt-1">
								* Quantidade mínima para encomenda: 10 unidades
							</p>
						</div>

						<Button
							onClick={handleOrder}
							className="w-full bg-[#242424] hover:bg-[#3a3a3a] text-white"
							disabled={quantity < 10 || success}
						>
							{success ? (
								<span className="flex items-center">
									<Check className="h-5 w-5 mr-2" />
									Pedido enviado!
								</span>
							) : (
								"Encomendar via WhatsApp"
							)}
						</Button>
					</div>
				</div>
			</div>

			<WhatsAppButton phoneNumber="5548991684860" />
		</main>
	)
}
