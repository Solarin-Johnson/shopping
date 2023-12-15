import './App.scss';
import Collection from './components/collection/collection';
import Display from './components/display/display';
import Navigation from './components/navigation/navigation';
import Cart from './components/cart';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const links = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navigation />
          <Display />
          <Collection />
          <Cart />
        </>
      ),
    }])
  return <div className='container'>
    <RouterProvider router={links} />
  </div>
}

export default App;
