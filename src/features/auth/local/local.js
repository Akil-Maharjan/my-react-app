// features/auth/local/local.js
export const setAuthToLocal = ({ user, token }) => {
  localStorage.setItem('auth', JSON.stringify({ user, token }));
};

export const getAuthFromLocal = () => {
  const auth = localStorage.getItem('auth');
  return auth ? JSON.parse(auth) : null;
};

export const clearAuthFromLocal = () => {
  localStorage.removeItem('auth');
};

export const setCartToLocal = (carts) => {
  localStorage.setItem('carts', JSON.stringify(carts));
};

export const getCartFromLocal = () => {
  const carts = localStorage.getItem('carts');
  return carts ? JSON.parse(carts) : [];
};

export const clearCartFromLocal = () => {
  localStorage.removeItem('carts');
};