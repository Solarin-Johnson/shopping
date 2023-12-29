import './App.scss';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './pages/home';
import { DataProvider } from './DataContext';
import { Arrivals, Best, Favorite, Featured } from './pages/paths';
import WishList from './pages/cart';
import Invoice from './pages/invoice';
import SearchPage from './pages/search';

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
    {
      path: "/search",
      element: (
        <SearchPage />
      ),
    },
  ])
  return <div className='container'>
    {/* <Background /> */}
    <DataProvider>
      <RouterProvider router={links} />
    </DataProvider>
  </div>
}

export default App;
