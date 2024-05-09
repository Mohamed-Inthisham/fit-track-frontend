import { Toaster } from "react-hot-toast";
import "./App.css";
import UserRouter from "./router/UserRouter";

function App() {
  return (
    <div className="App bg-gray-400 h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <UserRouter />
    </div>
  );
}

export default App;
