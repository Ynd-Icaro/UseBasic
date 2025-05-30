export type Product = {
  id: number
  slug: string
  name: string
  price: number
  description: string
  images: {
    front: string
    back: string
    variations?: string[]
  }
  size: string[]
  color: string
  isNew: boolean
  isSeasonal: boolean
  category: string
}