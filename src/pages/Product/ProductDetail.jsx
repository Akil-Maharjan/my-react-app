import { useParams } from "react-router"
import { useGetProductQuery } from "./productApi.js";
import { baseUrl } from "../../app/apiUrl.js";
import { Rating } from "@material-tailwind/react";
import AddToCart from "./AddToCart.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { isLoading, error, data } = useGetProductQuery(id);
  if (isLoading) return <h1>Loading....</h1>
  if (error) return <h1>{error.data}</h1>
  return (
    <div className="p-5 grid grid-cols-[1.3fr_2fr] gap-16">

      <div>
        <img src={`${baseUrl}/uploads/${data.image}`} alt="" />
      </div>

      <div className="space-y-3 ">
        <h1 className="font-semibold text-xl">{data.title}</h1>
        <p className="text-gray-700">Rs.{data.price}</p>
        <p className="text-gray-700">Brand: {data.brand}</p>
        <Rating readonly value={data.rating} />

        <div className="mt-11">
          <AddToCart product={data} />
        </div>
      </div>


    </div>
  )
}
