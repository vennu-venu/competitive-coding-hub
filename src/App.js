import "./App.css";
import Start from "./components/start";
import Login from "./components/login";
import Register from "./components/register";
import { Routes, Route } from "react-router-dom";

function App() {
  
  const handleRegister = async() => {
    try {
      const user = await createUserWithEmailAndPassword(auth, "user@gmail.com", "pwd@1234");
      console.log(user);
    }
    catch(error) {
      console.log("Error in Sign Up: ", error.message);
    }
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
