import './App.css';
import ObjectsList from './components/ObjectsList';
import Object from './components/Object';
import Home from './components/Home';
import {Route, Link, Routes} from 'react-router-dom';
import NotFound from './components/NotFound';


const App = () => {
  return (
    <div className='App'>
      
     
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection/page/:page' element={<ObjectsList />} />
        <Route path='/collection/page/' element={<NotFound />} />
        <Route path='/collection/:id' element={<Object/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </div>
  );
};

export default App;
