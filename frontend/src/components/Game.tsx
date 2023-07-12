import { FC } from "react";
import { Outlet } from "react-router-dom";

interface GameProps {}

const Game: FC<GameProps> = () => {
  return (
    <div className="min-h-screen flex items-center m-auto justify-center">
      <Outlet></Outlet>
    </div>
  );
};

export default Game;
