import GameCanvas from "@components/GameCanvas";
import { getToken } from "@lib/helpers";
import { connectSocket } from "@lib/socketsHelper";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface GameScreenProps {}

let states: "loading" | "joining" | "moving" | "currentRoll" | "waiting";

const socket = connectSocket();

const GameScreen: FC<GameScreenProps> = () => {
  const { id } = useParams();
  const [state, setState] = useState<typeof states>("joining");

  useEffect(() => {
    socket.emit("join_game", {
      token: getToken(),
      gameid: id,
    });
    setState("loading");
    socket.on("add_player", (data) => {
      console.log("test");
      console.log(data);
    });
  }, []);

  return <GameCanvas />;
};

export default GameScreen;
