import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
        setProducts(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching products');
        console.error(err);
      }
    };

    fetchProducts();
  }, []); // empty dependency array to run once on mount

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id || product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Product;
