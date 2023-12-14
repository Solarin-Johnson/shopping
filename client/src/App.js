import './App.scss';
import Collection from './layout/collection';
import Display from './layout/display';
import './layout/layout.scss'
import Navigation from './layout/navigation';

function App() {
  return <div className='container'>
    <Navigation />
    <Display />
    <Collection />
  </div>
}

export default App;
