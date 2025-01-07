// import { GetShowCaseProducts } from "@/actions/getProduct";
import { GetShowCaseProducts } from "@/actions/getProducts";
import ProductCard from "@/components/productCard";

export default async function HomePage() {
  const products = await GetShowCaseProducts();
  if (!products) return;

  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-8 pb-8">
        <h3 className="w-full pl-6 text-left text-xl font-medium md:pl-8 lg:pl-12">
          Listings
        </h3>
        <div className="grid w-full grid-cols-2 gap-3 px-3 pb-10 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4 lg:px-8">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              href={p.id}
              imageUrl={p.showCase}
              productTitle={p.name}
              brand={"NIKE"}
              price={p.price}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
