import React from 'react'

function Product() {
    const product = {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      "category": "beauty",
      "price": 9.99,
      "rating": 2.56,
      "stock": 99,
      "tags": [
        "beauty",
        "mascara"
      ],
      "brand": "Essence",
      "weight": 4,
      "dimensions": {
        "width": 15.14,
        "height": 13.08,
        "depth": 22.99
      },
      "warrantyInformation": "1 week warranty",
      "shippingInformation": "Ships in 3-5 business days",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 3,
          "comment": "Would not recommend!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Eleanor Collins",
          "reviewerEmail": "eleanor.collins@x.dummyjson.com"
        }
      ],
      
      "images": [
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    };
  return (
    <div className='flex flex-col gap-2 items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 p-6'>
      <h1 className='text-3xl font-bold mb-6 text-pink-800'>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} className='mb-4' />
      <p className='text-gray-800'>{product.description}</p>
      <p className='text-gray-600'>Price: ${product.price}</p>
      <p className='text-gray-600'>Rating: {product.rating}</p>
      <p className='text-gray-600'>Stock: {product.stock}</p>
      <p>Tags: {product.tags.map((tag) => (
        <span key={tag} className='bg-pink-200 text-pink-800 rounded-full px-2 py-1 text-sm cursor-pointer font-semibold mr-2'>{tag}</span>
      ))}</p>
      <p className='text-gray-600'>Brand: {product.brand}</p>
      <p className='text-gray-600'>Weight: {product.weight} kg</p>
      <p className='text-gray-600'>Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p>
      <p className='text-gray-600'>Warranty: {product.warrantyInformation}</p>
      <p className='text-gray-600'>Shipping: {product.shippingInformation}</p>
      <p className='text-gray-600'>Availability: {product.availabilityStatus}</p>
      <p className='text-gray-600'>Reviews:</p>
      <p>{product.reviews.map((review) => (
        <div key={review.id} className='bg-white rounded-lg shadow-md p-4 mb-4 max-w-md w-full'>
          <p className='text-gray-800'>" {review.comment} "</p>
          <p className='text-gray-600 text-sm'>- {review.reviewerName}</p>
        </div>
      ))}</p>
    </div>
  )
}

export default Product