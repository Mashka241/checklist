import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './components/Home';
import { Lists } from './components/Lists';
import { List } from './components/List';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='lists' element={<Lists />} />
          <Route path='lists/:id' element={<List/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
