import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
