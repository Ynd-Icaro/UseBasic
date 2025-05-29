import Link from "next/link"
import { MapPin, Phone, Mail, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#242424] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Basic Clothing</h3>
            <p className="mb-4">Roupas básicas de alta qualidade para o seu dia a dia.</p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/use.basicclothing/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="/meus-links" className="hover:text-gray-300 transition-colors">
                <span className="text-sm">Meus Links</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-300 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-gray-300 transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/pedido-personalizado" className="hover:text-gray-300 transition-colors">
                  Pedido Personalizado
                </Link>
              </li>
              <li>
                <Link href="/meus-links" className="hover:text-gray-300 transition-colors">
                  Meus Links
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Criciúma, SC</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+55 48 99168-4860</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contato@basicclothing.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Basic Clothing. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
