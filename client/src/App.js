import './App.scss';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './pages/home';
import { DataProvider } from './DataContext';
import { Arrivals, Best, Favorite, Featured } from './pages/paths';
import WishList from './pages/cart';
import Invoice from './pages/invoice';
import { useEffect } from 'react';

function App() {
  const links = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
    },
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
    },
    {
      path: "/arrivals",
      element: (
        <Arrivals />
      ),
    },
    {
      path: "/best-sellings",
      element: (
        <Best />
      ),
    },
    {
      path: "/featured",
      element: (
        <Featured />
      ),
    },
    {
      path: "/favorite",
      element: (
        <Favorite />
      ),
    },
    {
      path: "/cart",
      element: (
        <WishList />
      ),
    },
    {
      path: "/invoice",
      element: (
        <Invoice />
      ),
    },

  ])

  useEffect(() => {
    // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //   const addTextCursorClass = (elements) => {
    //     elements.forEach(element => {
    //       element.classList.add('text-cursor');
    //     });
    //   }

    //   const divElements = document.querySelectorAll('div');
    //   const buttonElements = document.querySelectorAll('button');
    //   const spanElements = document.querySelectorAll('span');
    //   const iElements = document.querySelectorAll('i');

    //   addTextCursorClass(divElements);
    //   addTextCursorClass(spanElements);
    //   addTextCursorClass(iElements);
    //   addTextCursorClass(buttonElements);
    // }
  }, [])

  return <div className='container'>
    {/* <Background /> */}
    <DataProvider>
      <RouterProvider router={links} />
    </DataProvider>
  </div>
}

export default App;
