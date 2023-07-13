import { FC, useState } from "react";
import { Input } from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { Button } from "@components/ui/Button";
import { useNavigate } from "react-router-dom";
import FadeOutTransition from "@components/FadeOutTransition";
import Loader from "@components/ui/Loader";
import { createGameApi } from "@api/game";

interface CreateGameProps {}

const initValues = { gameName: "", numberOfPlayers: "" };

const initState = { isLoading: false, error: "", values: initValues };

const CreateGame: FC<CreateGameProps> = () => {
  const [state, setState] = useState(initState);
  const navigate = useNavigate();

  const inputHandler = ({ target }: { target: any }) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  async function createGame() {
    if (state.values.gameName.length === 0) {
      setState((prev) => ({
        ...prev,
        error: "Game name is required",
      }));
      return;
    }

    if (state.values.numberOfPlayers.length === 0) {
      setState((prev) => ({
        ...prev,
        error: "Number of players  is required",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      const res = await createGameApi({
        numberOfPalyers: Number(state.values.numberOfPlayers),
        gameName: state.values.gameName,
      });
      console.log(res);
      setState(initState);
      navigate(`/game/${res.data.game.gameId}`);
    } catch (error: any) {
      console.log(error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.response.data.message,
      }));
    }
  }

  return (
    <FadeOutTransition>
      <div className="max-w-xl border p-10 rounded-xl grid gap-5 w-full h-full items-center min-w-lg">
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="gameName">Game name</Label>
          <Input
            onChange={inputHandler}
            type="text"
            id="gameName"
            name="gameName"
            placeholder="Game name"
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="numberOfPlayers">Num. of players</Label>
          <Input
            onChange={inputHandler}
            type="number"
            id="numberOfPlayers"
            name="numberOfPlayers"
            placeholder="Num. of players"
          />
        </div>
        {state.isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="grid gap-5 mt-10">
              <Button onClick={() => createGame()}>Create Game</Button>
            </div>
            <p className="text-red-500">{state.error ? state.error : ""}</p>{" "}
          </>
        )}
      </div>
    </FadeOutTransition>
  );
};

export default CreateGame;
