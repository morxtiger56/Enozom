import { FC } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Auth from "@pages/Auth";
import Login from "@components/Login";
import Register from "@components/Register";
import { AnimatePresence } from "framer-motion";
import Game from "./Game";
import MainMenu from "@pages/MainMenu";
import LeaderBoard from "./LeaderBoard";

const routes = [
  { path: "/", element: <Navigate to="auth" replace /> },
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
  {
    path: "/game",
    element: <Game />,
    children: [
      { path: "", element: <Navigate to="main-menu" replace /> },
      {
        path: "main-menu",
        element: <MainMenu />,
      },
      {
        path: "leader-board/:id",
        element: <LeaderBoard />,
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
