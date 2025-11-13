import ProductCard from "./ProductCard";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

type Props = {
  products: Product[];
};

export default function ProductsList({ products }: Props) {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <div key={product.id} className="flex flex-col">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
