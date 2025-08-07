
import { createHashRouter, RouterProvider } from "react-router-dom"; 

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
import Product from "./pages/Product/Product";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";





function App() {
  const router = createHashRouter([
    {
     path: '/', // This is the root route
      element: <RootLayout />,
      children: [

        {
          
          path : '/',
          element: <Home />,
        },
        {
          path: 'contact',
          element: <Contact />,
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'recipe',
          element: <Recipe />,
        },
        {
          path: 'recipe/:category',
          element: <Recipe />,
        },
          {
            path: 'articles',
            element: <Article />
          },
          {
            path: 'articles/:id',
            element: <Article />
          },
          {
            path: 'articles-form',
            element: <ArticleForm />
          },
          {
            path : 'product',
            element: <Product />
          },
          {
            index : true,
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          },
         

         {
      path: 'user-form',
      element: <UserForm />
    },
    {
      path: 'articles-form/:id',
      element: <ArticleForm />
    },
    {
      path: 'user-form/:idx',
      element: <UserForm />
    },
     {
      path: 'user-list',
      element: <UserList />
    },
    {
      path: '*',
      element: <NotFound />,
    },
      ]
    }
  ]);

  return(
    <>
    
      <RouterProvider router={router} />
       
  
      {/* <FlexLearning /> */}

{/* <ArrayData />       */}
{/* <Counter/> */}
{/* <Products /> */}
{/* <Toggle /> */}
{/* <UseRef /> */}
{/* <Section /> */}
{/* <Asyunchronous />     */}

    
    
      
    </>
  );
}

export default App;
