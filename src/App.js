import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import {DataProvider} from './context/DataContext';
import { Routes, Route } from 'react-router-dom';
import CoinInfo from './component/CoinInfo';


function App() {

  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/:id' element={<CoinInfo />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
