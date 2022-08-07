import "./App.css";
import Start from "./components/start";
import auth from "./firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth"

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
      <button onClick={handleRegister} className="btn">
        Add
      </button>
      <Start />
    </div>
  );
}

export default App;
