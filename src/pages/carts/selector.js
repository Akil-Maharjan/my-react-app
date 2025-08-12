// features/cart/selectors.js
import { createSelector } from '@reduxjs/toolkit';

const selectCartState = state => state.cart || {};

export const selectCartItems = createSelector(
  [selectCartState],
  cart => cart.items || []
);

export const makeSelectProductInCart = (productId) => 
  createSelector(
    [selectCartItems],
    items => items.find(item => item.id === productId)
  );