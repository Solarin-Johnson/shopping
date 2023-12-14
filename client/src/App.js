import './App.scss';
import Collection from './components/collection/collection';
import Display from './components/display/display';
import './layout/layout.scss'
import Navigation from './components/navigation/navigation';

function App() {
  return <div className='container'>
    <Navigation />
    <Display />
    <Collection />
  </div>
}

export default App;
