import { HOST_NAME } from "@lib/constants";
import { getToken } from "@lib/helpers";
import axios from "axios";

export async function listGamesApi() {
  let url = HOST_NAME + "/game/play?action=listGames";

  return await axios.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
}

export async function createGameApi({
  numberOfPalyers,
  gameName,
}: {
  numberOfPalyers: number;
  gameName: string;
}) {
  let url = HOST_NAME + "/game/play?action=create";

  return await axios.post(
    url,
    {
      numberOfPalyers,
      gameName,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
}