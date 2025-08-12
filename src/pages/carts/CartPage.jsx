import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../app/apiUrl.js";
import { Button, IconButton } from "@material-tailwind/react";
import { setToCart } from "./cartSlice.js";
import { createSelector } from "@reduxjs/toolkit";
export default function CartPage() {
   const selectCartsMemoized = createSelector(
    [(state) => state.carts],
    (carts) => carts || []
  );
  
  const carts = useSelector(selectCartsMemoized);
  const dispatch = useDispatch();
  const total = carts.reduce((a, b) => a + b.qty * b.price, 0)
  return (
    <div>

      {carts.length === 0 ? <h1 className="text-2xl font-bold">Cart is empty</h1> : <div>
        {carts.map((cart) => {
          return <div key={cart.id} className="grid grid-cols-3 mb-4 gap-7">

            <div className="flex  gap-5">
              <img className="h-[100px]" src={`${baseUrl}/${cart.image}`} alt="" />
              <h1 className="mt-3">{cart.title}</h1>
            </div>

            <div>
              <h1>Price: Rs.{cart.price}</h1>
              <div className="flex gap-5 items-center mt-3">
                <IconButton
                  onClick={() => dispatch(setToCart({ ...cart, qty: cart.qty - 1 }))}
                  disabled={cart.qty === 1}
                  size="sm">
                  <i className="fas fa-minus" />
                </IconButton>
                <h1>X {cart.qty}</h1>
                <IconButton
                  onClick={() => dispatch(setToCart({ ...cart, qty: cart.qty + 1 }))}
                  disabled={cart.qty >= cart.stock}
                  size="sm">
                  <i className="fas fa-add" />
                </IconButton>
              </div>


            </div>


          </div>
        })}
        <h1>Total:- Rs. {total}</h1>

        <Button className="mt-7">Place an Order</Button>

      </div>}




    </div>
  )
}
