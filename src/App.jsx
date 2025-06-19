
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import RootLayout from "./components/RootLayout";


function App() {
  const router = createBrowserRouter([
    {
     path: '/', // This is the root route
      element: <RootLayout />,
      children: [
        {
          
          path: '/',
          element: <Home />,
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'contact',
          element: <Contact />
        }
      ]
    }
  ]);

  return(
    <>
    
      <RouterProvider router={router} />
    </>
  );
}

export default App;
