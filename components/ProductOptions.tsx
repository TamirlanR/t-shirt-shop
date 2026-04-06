"use client";

import { useState } from "react";
import { useCart } from "@/src/context/CartContext";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    sizes: string[];
    colors: string[];
  };
};

export default function ProductOptions({ product }: Props) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Sizes</h2>
        <div className="flex gap-2 flex-wrap">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded-lg text-sm ${
                selectedSize === size ? "bg-black text-white" : ""
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Colors</h2>
        <div className="flex gap-2 flex-wrap">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 border rounded-lg text-sm ${
                selectedColor === color ? "bg-black text-white" : ""
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          addToCart({
            id: `${product.id}-${selectedSize}-${selectedColor}`,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
            color: selectedColor,
            quantity: 1,
          })
        }
        className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90"
      >
        Add to cart
      </button>
    </div>
  );
}