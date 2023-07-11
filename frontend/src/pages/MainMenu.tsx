import FadeOutTransition from "@components/FadeOutTransition";
import { Button } from "@components/ui/Button";
import { FC } from "react";

interface MainMenuProps {}

const MainMenu: FC<MainMenuProps> = () => {
  return (
    <FadeOutTransition>
      <div className="min-h-screen flex items-center  m-auto justify-center">
        <div className="max-w-xl  border p-10 rounded-xl grid gap-5 w-full h-full items-center min-w-lg">
          <Button>Join Game</Button>
          <Button variant={"secondary"}>Create Game</Button>
          <Button variant={"outline"}>History</Button>
        </div>
      </div>
    </FadeOutTransition>
  );
};

export default MainMenu;
