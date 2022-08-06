import "./App.css";
import Start from "./components/start";
import { useAuth } from "./contexts/auth-context"

function App() {

  const { signup } = useAuth();

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      // await signup((Math.random() + 1).toString(36).substring(7), (Math.random() + 1).toString(36).substring(7));
      await signup("Ram", "1234");
    } catch {
      console.log("Error occurred");
    }
  }

  return (
    <div>
      <button onClick={handleSignUp} className="btn">Add</button>
      <Start />
    </div>
  );
}

export default App;
