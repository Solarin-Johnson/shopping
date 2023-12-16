import './App.scss';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './pages/home';
import Background from './components/background';
import { Arrivals, Best, Featured } from './pages/paths';

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
  ])
  return <div className='container'>
    <Background />
    <RouterProvider router={links} />
  </div>
}

export default App;
