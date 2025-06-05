import { productImagesAndColors } from "@/data/product-images";

export function getProductImagesAndColors(slug: string) {
  return productImagesAndColors[slug] || [];
}