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

export async function joinGameAoi() {
  let url = HOST_NAME + "/game/play?action=join";

  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
