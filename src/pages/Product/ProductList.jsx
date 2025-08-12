import { useGetProductsQuery } from "./productApi.js"
import ProductCard from "./ProductCard.jsx";

export default function ProductList() {
  const { isLoading, data, error } = useGetProductsQuery();
  if (isLoading) return <h1>Loading....</h1>
  if (error) return <h1>{error.data}</h1>


  return (
    <div className="grid grid-cols-4 gap-5">

      {data && data.products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}



    </div>
  )
}
