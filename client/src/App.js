import './App.scss';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './pages/home';
import Arrivals from './pages/arrivals';
import Background from './components/background';

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
    }
  ])
  return <div className='container'>
    <Background />
    <RouterProvider router={links} />
  </div>
}

export default App;
