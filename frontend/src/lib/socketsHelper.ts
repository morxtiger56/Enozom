import { Socket, io } from "socket.io-client";
import { getToken } from "./helpers";

export function connectSocket() {
  const IO = io("http://localhost:3001");
  return IO.connect();
}

export function joinGame(socket: Socket, gameId: number) {
  socket.emit("join_game", {
    token: getToken(),
    gameId: gameId,
  });
}

export function movePlayer(socket: Socket, gameId: number) {
  console.log(gameId);
  socket.emit("move", {
    token: getToken(),
    gameid: gameId,
  });
}
