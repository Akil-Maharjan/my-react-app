
import { createHashRouter, RouterProvider } from "react-router-dom"; 
import AuthInitializer from './components/AuthInitializer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

import RootLayout from "./components/RootLayout"; 

import Recipe from './pages/Recipe';
import NotFound from './pages/NotFound/NotFound';
import UserForm from "./pages/user/UserForm";
import UserList from "./pages/user/UserList";
import Article from "./articles/Article";
import ArticleForm from "./articles/ArticleForm";
import Product from "./pages/Product/ProductList";
import ProductAdd from "./pages/Product/ProductAdd";
import ProductUpdate from "./pages/Product/ProductUpdate";
import ProductDetail from "./pages/Product/ProductDetail";
import CartPage from "./pages/carts/CartPage";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";






function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        // Public routes
        { index: true, element: <Home /> },
        { path: 'contact', element: <Contact /> },
        { path: 'about', element: <About /> },
        { path: 'recipe', element: <Recipe /> },
        { path: 'recipe/:category', element: <Recipe /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        
        // Protected routes
        {
          element: <ProtectedRoute />,
          children: [
            { path: 'articles', element: <Article /> },
            { path: 'articles/:id', element: <Article /> },
            { path: 'articles-form', element: <ArticleForm /> },
            { path: 'articles-form/:id', element: <ArticleForm /> },
            { path: 'product', element: <Product /> },
            { path: 'product-add', element: <ProductAdd /> },
            { path: 'product-update/:id', element: <ProductUpdate /> },
            { path: 'product-detail/:id', element: <ProductDetail /> },
            { path: 'carts', element: <CartPage /> },
            { path: 'user-form', element: <UserForm /> },
            { path: 'user-form/:idx', element: <UserForm /> },
            { path: 'user-list', element: <UserList /> },
          ]
        },
        
        // Catch-all route
        { path: '*', element: <NotFound /> }
      ]
    }
  ]);

  return (
    <>
      <AuthInitializer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
