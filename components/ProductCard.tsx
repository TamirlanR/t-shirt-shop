import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-64 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </Link>

      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600 text-sm mt-2">{product.description}</p>
      <p className="text-lg font-bold mt-3">${product.price}</p>

      <Link
        href={`/product/${product.id}`}
        className="inline-block mt-4 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
      >
        View product
      </Link>
    </div>
  );
}