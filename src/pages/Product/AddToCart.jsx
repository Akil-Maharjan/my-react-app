import { Button, IconButton } from "@material-tailwind/react";
import { useState } from "react"
import { useDispatch, useSelector,  } from "react-redux";
import { useNavigate } from "react-router";
import { setToCart } from "../carts/cartSlice.js";
import { makeSelectProductInCart } from '../carts/selector.js';
import { shallowEqual } from 'react-redux';
import { useMemo } from 'react';

export default function AddToCart({ product }) {
  const selectProductInCart = useMemo(
    () => makeSelectProductInCart(product._id),
    [product._id]
  );

  const cartItem = useSelector(selectProductInCart, shallowEqual);
  
  const [count, setCount] = useState(cartItem?.quantity || 1);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users?.users || []);

  const addTocart = () => {
    dispatch(setToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty: count,
      stock: product.stock
    }));
    nav('/carts');

  }

  return (
    <div className="space-y-6">

      <div className="flex items-center gap-5">

        <IconButton
          onClick={() => setCount((prev) => prev - 1)}
          disabled={count === 1}
          size="sm">
          <i className="fas fa-minus" />
        </IconButton>

        <p>{count}</p>
        <IconButton
          disabled={count >= product.stock}
          onClick={() => setCount((prev) => prev + 1)}
          size="sm">
          <i className="fas fa-add" />
        </IconButton>


      </div>

      <Button
  onClick={addTocart}
  disabled={users?.role === 'Admin' || !users}>
  Add To Cart
</Button>


    </div>
  )
}
