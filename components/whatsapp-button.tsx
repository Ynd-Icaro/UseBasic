"use client"

import { WhatsappLogo } from "@phosphor-icons/react"

export function WhatsAppButton({ phoneNumber }: { phoneNumber: string }) {
  // Remove any non-numeric characters for the WhatsApp link
  const formattedNumber = phoneNumber.replace(/\D/g, "")

  return (
    <a
      href={`https://wa.me/${formattedNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="Contato via WhatsApp"
    >
      <WhatsappLogo weight="fill" className="h-6 w-6" />
    </a>
  )
}
