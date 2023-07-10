import { FC } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Auth from "@pages/Auth";
import Login from "@components/Login";
import Register from "@components/Register";
import { AnimatePresence } from "framer-motion";

const routes = [
  { path: "/", element: <h1>Hello</h1> },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      { path: "", element: <Navigate to="login" replace /> },
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
];

interface AnimatedRoutesProps {}

const AnimatedRoutes: FC<AnimatedRoutesProps> = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.key}>
        {routes.map((link) => (
          <Route path={link.path} element={link.element}>
            {link.children
              ? link.children.map((children) => (
                  <Route
                    path={children.path}
                    element={children.element}
                  ></Route>
                ))
              : null}
          </Route>
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
