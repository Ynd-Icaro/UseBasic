"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DesignExamplesModal } from "@/components/design-examples-modal"

// Todas as cores disponíveis
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

const allSizes = ["PP", "P", "M", "G", "GG", "XG", "XGG", "G1", "G2", "G3", "G4"]

// Tipos de produtos disponíveis
const allProducts = [
    { label: "Camiseta Básica", value: "camiseta", size: allSizes },
    { label: "Oversized", value: "oversized", size: allSizes },
    { label: "Regata", value: "regata", size: allSizes },
    { label: "Cropped", value: "cropped", size: allSizes },
    { label: "T-shirt", value: "tshirt", size: allSizes },
    { label: "Bermuda", value: "bermuda", size: allSizes },
    { label: "Moletom Canguru", value: "moletom-canguru", size: allSizes },
    { label: "Moletom Careca", value: "moletom-careca", size: allSizes },
    { label: "Calça Moletom", value: "calca-moletom", size: allSizes },
    { label: "Corta Vento", value: "corta-vento", size: allSizes },
]

// Define types above your component
type Item = {
    productType: string
    size: string
    color: string
    quantity: number
}

type FormData = {
    name: string
    phone: string
    designDescription: string
    items: Item[]
}

export default function CustomOrderPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        phone: "",
        designDescription: "",
        items: [{ productType: "", size: "", color: "", quantity: 10 }],
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [success, setSuccess] = useState(false)

    // Manipula campos do formulário principal
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    // Manipula seleção de produto, cor, tamanho, quantidade para cada item
    const handleItemChange = (idx: number, key: "size" | "color" | "productType" | "quantity", value: string) => {
        setFormData((prev) => {
            const items = [...prev.items]
            const item = { ...items[idx] }
            if (key === "quantity") {
                item.quantity = Number(value)
            } else if (key === "size") {
                item.size = value
            } else if (key === "color") {
                item.color = value
            } else if (key === "productType") {
                item.productType = value
            }
            items[idx] = item
            return { ...prev, items }
        })
    }

    // Adiciona novo item (produto/cor/tamanho/quantidade)
    const addItem = () => {
        setFormData((prev) => ({
            ...prev,
            items: [...prev.items, { productType: "", size: "", color: "", quantity: 10 }],
        }))
    }

    // Remove item
    const removeItem = (idx: number) => {
        setFormData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== idx),
        }))
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.name.trim()) newErrors.name = "Nome é obrigatório"
        if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório"
        if (!formData.designDescription.trim()) newErrors.designDescription = "Descrição da estampa é obrigatória"
        let totalQty = 0
        formData.items.forEach((item, idx) => {
            if (!item.productType) newErrors[`productType${idx}`] = "Tipo obrigatório"
            if (!item.size) newErrors[`size${idx}`] = "Tamanho obrigatório"
            if (!item.color) newErrors[`color${idx}`] = "Cor obrigatória"
            if (!item.quantity || item.quantity < 1) newErrors[`quantity${idx}`] = "Mínimo 1"
            totalQty += Number(item.quantity)
        })
        if (totalQty < 10) newErrors.quantity = "Quantidade mínima total: 10"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        // Monta mensagem do WhatsApp
        let message = `*Pedido Personalizado*\n\n`
        message += `*Nome:* ${formData.name}\n`
        message += `*Telefone:* ${formData.phone}\n`
        message += `*Descrição da Estampa:* ${formData.designDescription}\n`
        formData.items.forEach((item, idx) => {
            message += `*Item ${idx + 1}:* Produto: ${allProducts.find(p => p.value === item.productType)?.label || ""} | Tamanho: ${item.size} | Cor: ${item.color} | Quantidade: ${item.quantity}\n`
        })

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
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Pedido Personalizado</h1>

                <div className="bg-[#242424] text-white p-6 rounded-lg mb-8">
                    <h2 className="text-xl font-semibold mb-4">Estampas Personalizadas</h2>
                    <p className="mb-4">
                        Crie peças únicas com suas próprias estampas! Envie seu design ou conte sua ideia e nós criamos para você.
                    </p>
                    <DesignExamplesModal />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-xl font-semibold">Detalhes do Pedido</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-base">
                                Nome Completo *
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Seu nome"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-base">
                                Telefone *
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="(XX) XXXXX-XXXX"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="designDescription" className="text-base">
                            Descrição da Estampa *
                        </Label>
                        <Textarea
                            id="designDescription"
                            name="designDescription"
                            placeholder="Descreva sua ideia de estampa: cores, estilo, texto, imagens, posicionamento, etc."
                            rows={4}
                            value={formData.designDescription}
                            onChange={handleInputChange}
                            className={errors.designDescription ? "border-red-500" : ""}
                        />
                        {errors.designDescription && <p className="text-red-500 text-sm">{errors.designDescription}</p>}
                    </div>

                    <div className="space-y-4 mt-8">
                        <Label className="text-base">Itens do Pedido (tipo, tamanho, cor, quantidade):</Label>
                        {formData.items.map((item, idx) => {
                            const prodData = allProducts.find((prod) => prod.value === item.productType) || allProducts[0]
                            return (
                                <div key={idx} className="flex flex-col md:flex-row gap-4 items-center border-b pb-2">
                                    {/* Tipo de produto */}
                                    <Select
                                        value={item.productType}
                                        onValueChange={(value) => handleItemChange(idx, "productType", value)}
                                    >
                                        <SelectTrigger className="min-w-[160px]">
                                            <SelectValue placeholder="Tipo de produto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {allProducts.map((prod) => (
                                                <SelectItem key={prod.value} value={prod.value}>{prod.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {/* Tamanho */}
                                    <Select
                                        value={item.size}
                                        onValueChange={(value) => handleItemChange(idx, "size", value)}
                                    >
                                        <SelectTrigger className="min-w-[100px]">
                                            <SelectValue placeholder="Tamanho" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(prodData.size || []).map((size: string) => (
                                                <SelectItem key={size} value={size}>{size}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {/* Cor */}
                                    <Select
                                        value={item.color}
                                        onValueChange={(value) => handleItemChange(idx, "color", value)}
                                    >
                                        <SelectTrigger className="min-w-[160px]">
                                            <SelectValue placeholder="Cor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {allColors.map((color) => (
                                                <SelectItem key={color.name} value={color.name}>
                                                    <span className="inline-flex items-center gap-2">
                                                        <span
                                                            className="inline-block w-5 h-5 rounded border"
                                                            style={{ background: color.code, borderColor: "#ccc" }}
                                                        />
                                                        {color.name}
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {/* Quantidade */}
                                    <Input
                                        type="number"
                                        min={1}
                                        value={item.quantity || 1}
                                        onChange={e => handleItemChange(idx, "quantity", e.target.value)}
                                        className="w-20"
                                        placeholder="Qtd."
                                    />
                                    {formData.items.length > 1 && (
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
                                    <div className="flex flex-col">
                                        {errors[`productType${idx}`] && <p className="text-red-500 text-xs">{errors[`productType${idx}`]}</p>}
                                        {errors[`size${idx}`] && <p className="text-red-500 text-xs">{errors[`size${idx}`]}</p>}
                                        {errors[`color${idx}`] && <p className="text-red-500 text-xs">{errors[`color${idx}`]}</p>}
                                        {errors[`quantity${idx}`] && <p className="text-red-500 text-xs">{errors[`quantity${idx}`]}</p>}
                                    </div>
                                </div>
                            )
                        })}
                        <Button type="button" variant="outline" onClick={addItem}>
                            + Adicionar item
                        </Button>
                        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Informações Importantes:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Quantidade mínima total: 10 produtos</li>
                            <li>Tamanhos disponíveis: PP ao G4</li>
                            <li>Formatos aceitos: JPG, PNG, PDF, AI, PSD</li>
                            <li>Resolução recomendada: 300 DPI</li>
                            <li>Entraremos em contato para ajustes e aprovação</li>
                            <li>Envie sua arte após fazer o pedido via WhatsApp</li>
                        </ul>
                    </div>

                    <Button type="submit" className="w-full bg-[#242424] hover:bg-[#3a3a3a] text-white" disabled={success}>
                        {success ? (
                            <span className="flex items-center">
                                <Check className="h-5 w-5 mr-2" />
                                Pedido enviado!
                            </span>
                        ) : (
                            "Enviar Pedido"
                        )}
                    </Button>
                </form>
            </div>

            <WhatsAppButton phoneNumber="5548991684860" />
        </main>
    )
}
