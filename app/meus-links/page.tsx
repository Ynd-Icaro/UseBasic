"use client"
import Link from "next/link"
import { Instagram, Globe, Phone } from "lucide-react"
import { useEffect, useState } from "react"

export default function MeusLinks() {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-[#242424] mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">BC</span>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Basic Clothing</h1>
            <p className="text-gray-600 text-center mb-6">Roupas básicas de alta qualidade para o seu dia a dia</p>
          </div>

          <div className="space-y-4">
            <Link
              href="https://www.instagram.com/use.basicclothing/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-800">Instagram</span>
            </Link>

            <Link
              href="https://wa.me/5548991684860"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-800">WhatsApp</span>
            </Link>

            <Link
              href="/"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#242424] rounded-lg flex items-center justify-center mr-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-800">Site Oficial</span>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
            &copy; {year ? year : ""} Basic Clothing. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </main>
  )
}
