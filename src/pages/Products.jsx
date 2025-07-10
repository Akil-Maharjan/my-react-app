import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { faker } from '@faker-js/faker';

// A simple component to display star ratings
const Rating = ({ count }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-4 h-4 ${index < count ? 'text-yellow-700' : 'text-gray-400'}`}
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Generate mock product data
    const generateProducts = (count) => {
      return faker.helpers.multiple(() => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price({ min: 20, max: 300, symbol: '$' }),
        image: faker.image.urlLoremFlickr({ category: 'fashion', width: 640, height: 480 }),
        rating: faker.number.int({ min: 3, max: 5 }),
        isNew: faker.datatype.boolean(0.3), // 30% chance of being new
      }), { count });
    };

    setProducts(generateProducts(8));
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Typography variant="h2" color="blue-gray" className="font-semibold">
            Our Latest Products
          </Typography>
          <Typography variant="lead" color="gray" className="mt-2 max-w-2xl mx-auto">
            Explore our newest collection of products, designed to bring quality and style into your life.
          </Typography>
        </div>
        <div className="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <CardHeader floated={false} className="h-64 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button color="white" size="lg">Add to Cart</Button>
                </div>
                {product.isNew && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    NEW
                  </div>
                )}
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h5" color="blue-gray" className="mb-2 truncate">
                  {product.name}
                </Typography>
                <div className="flex justify-center items-center gap-4">
                  <Typography color="blue-gray" className="font-bold">
                    {product.price}
                  </Typography>
                  <Rating count={product.rating} />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products