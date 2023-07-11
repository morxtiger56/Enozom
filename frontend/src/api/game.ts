import { HOST_NAME } from "@lib/constants";
import axios from "axios";

export async function listGamesApi() {
  let url = HOST_NAME + "/game/play?action=listGames";
  const token = localStorage.getItem("auth_token");
  if (!token || token.length === 0) {
    return;
  }

  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
