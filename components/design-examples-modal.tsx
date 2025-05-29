"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HelpCircle, X } from "lucide-react"

export function DesignExamplesModal() {
  const [isOpen, setIsOpen] = useState(false)

  const examples = [
    {
      title: "Formato PNG com Fundo Transparente",
      description: "Ideal para logos e designs simples",
      image: "/placeholder.svg?height=200&width=200&text=PNG+Transparente",
      tips: ["Resolução mínima: 300 DPI", "Fundo transparente", "Formato PNG"],
    },
    {
      title: "Imagem em Alta Resolução",
      description: "Para fotos e designs complexos",
      image: "/placeholder.svg?height=200&width=200&text=Alta+Resolução",
      tips: ["Resolução: 300 DPI ou superior", "Formato JPG ou PNG", "Boa qualidade de imagem"],
    },
    {
      title: "Design Vetorial",
      description: "Melhor qualidade para impressão",
      image: "/placeholder.svg?height=200&width=200&text=Vetor+AI",
      tips: ["Formato AI, PDF ou SVG", "Escalável sem perda de qualidade", "Ideal para logos"],
    },
    {
      title: "Texto e Tipografia",
      description: "Para designs com texto",
      image: "/placeholder.svg?height=200&width=200&text=Tipografia",
      tips: ["Fonte legível", "Contraste adequado", "Tamanho apropriado"],
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-black border-gray-300 hover:bg-gray-50">
          <HelpCircle className="h-4 w-4" />
          Ver Exemplos de Design
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Como Enviar Sua Arte para Estampa
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Dicas Importantes:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Resolução mínima recomendada: 300 DPI</li>
              <li>• Tamanho máximo do arquivo: 10MB</li>
              <li>• Formatos aceitos: PNG, JPG, PDF, AI, PSD</li>
              <li>• Para melhor qualidade, prefira arquivos vetoriais (AI, PDF)</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examples.map((example, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="relative h-48 bg-gray-100 rounded-md mb-4 overflow-hidden">
                  <Image src={example.image || "/placeholder.svg"} alt={example.title} fill className="object-cover" />
                </div>
                <h4 className="font-semibold mb-2">{example.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{example.description}</p>
                <ul className="text-sm space-y-1">
                  {example.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-center text-green-700">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Evite:</h3>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• Imagens de baixa resolução (menos de 150 DPI)</li>
              <li>• Arquivos muito pequenos que ficam pixelizados</li>
              <li>• Imagens com direitos autorais sem permissão</li>
              <li>• Designs muito complexos para o tamanho da peça</li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">Ainda tem dúvidas? Entre em contato conosco pelo WhatsApp!</p>
            <Button
              onClick={() => {
                window.open(
                  "https://wa.me/5548991684860?text=Olá! Tenho dúvidas sobre como enviar minha arte para estampa.",
                  "_blank",
                )
                setIsOpen(false)
              }}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
