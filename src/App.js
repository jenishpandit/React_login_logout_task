import './App.css';
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import SignUp from './component/SignUp';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
