import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

import ProductOptions from "@/components/ProductOptions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="relative w-full h-[500px]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-semibold mb-6">${product.price}</p>

        <ProductOptions
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            sizes: product.sizes,
            colors: product.colors,
          }}
        />
      </div>
      </div>
  );
}