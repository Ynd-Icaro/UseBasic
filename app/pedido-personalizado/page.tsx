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

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    productType: "",
    designDescription: "",
    quantity: 10,
    size: "",
    color: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório"
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório"
    if (!formData.productType) newErrors.productType = "Tipo de produto é obrigatório"
    if (!formData.designDescription.trim()) newErrors.designDescription = "Descrição da estampa é obrigatória"
    if (formData.quantity < 10) newErrors.quantity = "Quantidade mínima é 10"
    if (!formData.size) newErrors.size = "Tamanho é obrigatório"
    if (!formData.color.trim()) newErrors.color = "Cor é obrigatória"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // Prepare WhatsApp message
    let message = `*Pedido Personalizado*\n\n`
    message += `*Nome:* ${formData.name}\n`
    message += `*Telefone:* ${formData.phone}\n`
    message += `*Tipo de Produto:* ${formData.productType}\n`
    message += `*Descrição da Estampa:* ${formData.designDescription}\n`
    message += `*Quantidade:* ${formData.quantity}\n`
    message += `*Tamanho:* ${formData.size}\n`
    message += `*Cor:* ${formData.color}\n`

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
            <Label htmlFor="productType" className="text-base">
              Tipo de Produto *
            </Label>
            <Select value={formData.productType} onValueChange={(value) => handleSelectChange("productType", value)}>
              <SelectTrigger className={errors.productType ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione o tipo de produto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="camiseta">Camiseta Básica</SelectItem>
                <SelectItem value="oversized">Oversized</SelectItem>
                <SelectItem value="regata">Regata</SelectItem>
                <SelectItem value="cropped">Cropped</SelectItem>
                <SelectItem value="tshirt">T-shirt</SelectItem>
                <SelectItem value="bermuda">Bermuda</SelectItem>
                <SelectItem value="moletom-canguru">Moletom Canguru</SelectItem>
                <SelectItem value="moletom-careca">Moletom Careca</SelectItem>
                <SelectItem value="calca-moletom">Calça Moletom</SelectItem>
                <SelectItem value="corta-vento">Corta Vento</SelectItem>
              </SelectContent>
            </Select>
            {errors.productType && <p className="text-red-500 text-sm">{errors.productType}</p>}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-base">
                Quantidade *
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                value={formData.quantity}
                onChange={handleInputChange}
                className={errors.quantity ? "border-red-500" : ""}
              />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
              <p className="text-sm text-gray-500">Mín. 10</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size" className="text-base">
                Tamanho *
              </Label>
              <Select value={formData.size} onValueChange={(value) => handleSelectChange("size", value)}>
                <SelectTrigger className={errors.size ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione o tamanho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PP">PP</SelectItem>
                  <SelectItem value="P">P</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="G">G</SelectItem>
                  <SelectItem value="GG">GG</SelectItem>
                  <SelectItem value="XG">XG</SelectItem>
                  <SelectItem value="XGG">XGG</SelectItem>
                  <SelectItem value="G1">G1</SelectItem>
                  <SelectItem value="G2">G2</SelectItem>
                  <SelectItem value="G3">G3</SelectItem>
                  <SelectItem value="G4">G4</SelectItem>
                </SelectContent>
              </Select>
              {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="color" className="text-base">
                Cor da Peça *
              </Label>
              <Input
                id="color"
                name="color"
                placeholder="Cor da peça base"
                value={formData.color}
                onChange={handleInputChange}
                className={errors.color ? "border-red-500" : ""}
              />
              {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Informações Importantes:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Quantidade mínima: 10 produtos</li>
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
