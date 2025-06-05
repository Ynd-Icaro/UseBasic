"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ProductGallery } from "@/components/product-gallery"
import { products } from "@/data/products" 
import { ProductCard } from "@/components/product-card"
import { getProductImagesAndColors } from "@/data/image-utils";

const defaultColors = [
    { name: "Branco", code: "#fff" },
    { name: "Preto", code: "#242424" },
    { name: "Cinza", code: "#43464B" },
    { name: "Azul Royal", code: "#4169e1" },
    { name: "Vermelho", code: "#BE0032" },
]

const CAMISA_BASICA_CORES = [
  "branco", "preto", "cinza", "azul-royal", "verde-maldivas", "azul-marinho",
  "azul-escura-15-3920", "verde-musgo-especial-18-5918", "vermelho-especial-19-1559",
  "vermelho-red-especial-19-1763", "azul-turquesa-especial-18-4252", "marrom-lead-especial-17-1118",
  "begue-serenidade-escura-11-0105", "rosa-adormecida-escura-18-2043", "cinza-estanho-escura-19-4014",
  "laranja-juice-16-1358", "begue-wood-especial-15-1308", "amarelo-sunshine-especial-14-1064",
  "rosa-lobster-16-1520", "verde-militar-k-18-0117", "vermelho-china-19-1650"
];

type Props = {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}

export default function ProductPage({ params, searchParams }: Props) {
    const { slug } = params

    const product = products.find((p) => p.slug === slug)
    if (!product) return <div>Produto não encontrado.</div>

    const images = {
        front: product.images.front,
        back: product.images.back,
        variations: product.images.variations || [],
    }

    // Estado para cor e tamanho selecionados
    const [items, setItems] = useState([
        {
            size: product.size[0],
            color: product.color,
            quantity: 10, // <-- mínimo já no início
        },
    ])

    // Estado para cor selecionada na galeria
    const [selectedColor, setSelectedColor] = useState(CAMISA_BASICA_CORES[0]);

    // Recomendações aleatórias apenas no client para evitar hydration error
    const [recommendations, setRecommendations] = useState<typeof products | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const filtered = products.filter((p) => p.slug !== slug)
        const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 4)
        setRecommendations(shuffled)
    }, [slug])

    useEffect(() => { setMounted(true); }, [])

    // Atualizar campo do item
    const handleItemChange = (
        idx: number,
        key: "size" | "color" | "quantity",
        value: string
    ) => {
        setItems((prev) =>
            prev.map((item, i) =>
                i === idx
                    ? {
                        ...item,
                        [key]: key === "quantity"
                            ? Math.max(10, Number(value))
                            : value
                    }
                    : item
            )
        )
    }

    // Adicionar novo item
    const addItem = () => {
        setItems((prev) => [
            ...prev,
            {
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

    // Cores disponíveis para o produto (se houver), senão cores padrões
    const productColors = product?.availableColors || defaultColors

    // Imagens e cores do produto (de acordo com o slug)
    const imagesAndColors = getProductImagesAndColors(product.slug);

    // Atualiza cor do item e da galeria ao clicar na bolinha
    const handleColorClick = (color: string) => {
        setSelectedColor(color);
        setItems((prev) =>
            prev.map((item, i) =>
                i === 0 ? { ...item, color } : item
            )
        );
    };

    // Imagem correspondente à cor selecionada
    const selectedImageObj = imagesAndColors.find((img: { color: string }) => img.color === selectedColor);

    // Soma total de produtos do kit
    const totalQuantity = items.reduce((sum, item) => sum + Number(item.quantity), 0)

    // Verifica se algum item está abaixo da quantidade mínima
    const anyItemBelowMin = items.some(item => Number(item.quantity) < 10);

    // Se for a camiseta básica, use o padrão dinâmico para a imagem da frente
    const isCamisaBasica = product.slug === "camiseta-basica";
    const getCamisaBasicaImage = (color: string) =>
      `/img/camisa-basica-${color}-frente.jpg`;

    const imageToShow = isCamisaBasica
      ? getCamisaBasicaImage(selectedColor)
      : selectedImageObj?.src || images.front;

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
                        <img
                          src={imageToShow}
                          alt={selectedColor}
                          className="object-cover w-full h-full"
                          onError={e => { (e.target as HTMLImageElement).src = "/img/placeholder.jpg" }}
                        />
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

                    {/* Itens do produto: tamanho, cor */}
                    <div className="mb-6">
                        <span className="font-semibold">Monte seu kit:</span>
                        <div className="space-y-4 mt-2">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex flex-wrap gap-2 items-center border-b pb-2">
                                    {/* Tamanho */}
                                    <select
                                        value={item.size}
                                        onChange={e => handleItemChange(idx, "size", e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                    >
                                        {(product.size || []).map((size: string) => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                    {/* Cor */}
                                    <select
                                        value={item.color}
                                        onChange={e => handleItemChange(idx, "color", e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                    >
                                        {productColors.map((color) => (
                                            <option key={color.name} value={color.name}>{color.name}</option>
                                        ))}
                                    </select>
                                    {/* Quantidade */}
                                    <input
                                        type="number"
                                        min={10}
                                        value={item.quantity}
                                        onChange={e => handleItemChange(idx, "quantity", e.target.value)}
                                        className="border rounded px-2 py-1 w-16 text-sm"
                                        style={{ width: 60 }}
                                    />
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
                            ))}
                            <Button type="button" variant="outline" onClick={addItem}>
                                + Adicionar item
                            </Button>
                        </div>
                        {/* Bolinhas de cor clicáveis */}
                        <div className="flex gap-2 mt-4">
                          {isCamisaBasica
                            ? CAMISA_BASICA_CORES.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  className={`w-7 h-7 rounded-full border-2 ${selectedColor === color ? "border-black" : "border-gray-300"}`}
                                  style={{
                                    background: `url(${getCamisaBasicaImage(color)}) center/cover no-repeat`
                                  }}
                                  title={color}
                                  onClick={() => setSelectedColor(color)}
                                />
                              ))
                            : productColors.map((color) => (
                                <button
                                    key={color.name}
                                    type="button"
                                    className={`w-7 h-7 rounded-full border-2 ${items[0].color === color.name ? "border-black" : "border-gray-300"}`}
                                    style={{ background: color.code }}
                                    title={color.name}
                                    onClick={() => handleColorClick(color.name)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="text-2xl font-semibold mb-6">
                        R$ {product.price.toFixed(2)}
                    </div>
                    <div className="mb-2">
                        <span className="text-sm text-gray-700">
                            Quantidade total do kit: <b>{totalQuantity}</b> produto{totalQuantity !== 1 ? "s" : ""}
                        </span>
                        {totalQuantity < 10 && (
                            <div className="text-red-600 text-sm mt-1">
                                O pedido mínimo é de 10 peças por kit.
                            </div>
                        )}
                    </div>
                    <Button asChild disabled={anyItemBelowMin}>
                        <a
                            href={`https://wa.me/5548991684860?text=Olá! Tenho interesse nos seguintes itens: ${items.map((item, idx) => `\n${idx + 1}. Produto: ${product.name}, Tamanho: ${item.size}, Cor: ${item.color}, Quantidade: ${item.quantity}`).join("")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Comprar pelo WhatsApp
                        </a>
                    </Button>
                    {anyItemBelowMin && (
                        <div className="text-red-600 text-sm mt-1">
                            O pedido mínimo é de 10 unidades por item do kit.
                        </div>
                    )}
                </div>
            </div>

            {/* Barra de recomendações */}
            <section className="mt-16">
                <h2 className="text-xl font-bold mb-4">Você também pode gostar</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {mounted && recommendations
                        ? recommendations.map((rec) => (
                            <ProductCard key={rec.id} product={rec} />
                        ))
                        : null
                    }
                </div>
                {mounted && !recommendations && (
                    <div className="col-span-4 text-center text-gray-400">Carregando recomendações...</div>
                )}
            </section>

            <section className="mt-16">
                <h2 className="text-xl font-bold mb-4">Cores populares para personalização</h2>
                <div className="flex flex-wrap gap-3">
                    {defaultColors.map((color) => (
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
