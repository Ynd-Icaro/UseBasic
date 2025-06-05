export type Product = {
  id: string
  name: string
  slug: string
  price: number
  images: {
    front: string
    back: string
    variations?: string[]
  }
  color: string
  size: string[]
  // Adicione outros campos conforme necessário
}