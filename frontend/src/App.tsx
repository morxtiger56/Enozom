import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Auth from "./pages/Auth";
import Login from "./components/Login";
import Register from "./components/Register";

const router = createBrowserRouter([
  { path: "/", element: <h1>Hello</h1> },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
