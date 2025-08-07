import React from 'react'
import axios from 'axios';

function Product() {

    const products = async () => {
        try{
         const response =  await axios.get('http://localhost:5000/')
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