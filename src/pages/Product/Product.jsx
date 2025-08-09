import React from 'react'
import axios from 'axios';

function Product() {

    const products = async () => {
        try{
         const response =  await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)

             return response.data;
        }
        catch(error){
            console.log(error)
        }
    }
    console.log(products())
  return (
    <div>Product</div>
  )
}

export default Product