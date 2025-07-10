
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import RootLayout from "./components/RootLayout"; 
import Recipe from './pages/Recipe';
import NotFound from './pages/NotFound/NotFound';



function App() {
  const router = createBrowserRouter([
    {
     path: '/', // This is the root route
      element: <RootLayout />,
      children: [
        {
          
          index: true,
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
        }
      ]
    },
    {
      path: 'recipe/:category',
      element: <Recipe />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
   
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
