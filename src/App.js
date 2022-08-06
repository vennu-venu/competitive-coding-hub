import "./App.css";
import Start from "./components/start";
import Login from "./components/login";
import{Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Start/>}></Route>  
      <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
