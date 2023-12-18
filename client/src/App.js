import './App.scss';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './pages/home';
import { DataProvider } from './DataContext';
import Background from './components/background';
import { Arrivals, Best, Favorite, Featured } from './pages/paths';

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
  ])
  return <div className='container'>
    {/* <Background /> */}
    <DataProvider>
      <RouterProvider router={links} />
    </DataProvider>
  </div>
}

export default App;
