import GameCanvas from "@components/GameCanvas";
import { Button } from "@components/ui/Button";
import { getToken } from "@lib/helpers";
import { connectSocket, movePlayer } from "@lib/socketsHelper";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface GameScreenProps {}

let states: "loading" | "joining" | "moving" | "currentRoll" | "waiting";

const socket = connectSocket();

const GameScreen: FC<GameScreenProps> = () => {
  const { id } = useParams();
  const [state, setState] = useState<typeof states>("joining");

  const [players, setPlayers] = useState<
    {
      playerId: number;
      position: number;
    }[]
  >([]);

  useEffect(() => {
    socket.emit("join_game", {
      token: getToken(),
      gameid: id,
    });
    setState("loading");
    socket.on("add_player", (data) => {
      console.log("test");
      console.log(data);
      // filter by gameId
      // add player counter by 1
      // check state of game
      const newPlayer = [...players];
      newPlayer.push({ playerId: data.userid, position: 0 });
      setPlayers(newPlayer);
    });

    socket.on("move", (data) => {
      const newPlayers = [...players].filter((e) => e.playerId !== data.userId);

      newPlayers.push({ playerId: data.userId, position: data.pos });
      setPlayers(newPlayers);
      console.log(newPlayers);
    });

    socket.on("roll_number", (data) => {
      console.log("roll_number", data);
    });

    socket.on("state", (data) => {
      console.log("state", data);
    });
    socket.on("new_turn", (data) => {
      console.log("new_turn", data);
    });
  }, []);

  return (
    <>
      <GameCanvas players={players} />
      <Button onClick={() => movePlayer(socket, Number(id))}>
        Move Player
      </Button>
    </>
  );
};

export default GameScreen;
