import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Black T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear.",
    price: 25,
    image: "/images/shirt1.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
  },
  {
    id: "2",
    name: "Oversized White T-Shirt",
    description: "Loose fit t-shirt with soft fabric.",
    price: 30,
    image: "/images/shirt2.jpg",
    sizes: ["M", "L", "XL"],
    colors: ["White", "Gray"],
  },
  {
    id: "3",
    name: "Streetwear Beige T-Shirt",
    description: "Minimalist style t-shirt with relaxed fit.",
    price: 28,
    image: "/images/shirt1.jpg",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Brown"],
  },
];