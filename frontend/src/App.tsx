import "./App.css";
import "./index.css";

import AnimatedRoutes from "./components/AnimatedRoutes";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes></AnimatedRoutes>
    </BrowserRouter>
  );
}

export default App;
