import FadeOutTransition from "@components/FadeOutTransition";
import { Button } from "@components/ui/Button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface MainMenuProps {}

const MainMenu: FC<MainMenuProps> = () => {
  const navigate = useNavigate();
  return (
    <FadeOutTransition>
      <div className="min-h-screen flex items-center  m-auto justify-center">
        <div className="max-w-xl  border p-10 rounded-xl grid gap-5 w-full h-full items-center min-w-lg">
          <Button onClick={() => navigate("/game/list")}>Join Game</Button>
          <Button variant={"secondary"}>Create Game</Button>
        </div>
      </div>
    </FadeOutTransition>
  );
};

export default MainMenu;
