import AuthData from "@/types/authData";
import { HOST_NAME } from "@lib/constants";
import axios from "axios";

export async function authUserApi(
  authData: AuthData,
  op: "login" | "register"
) {
  let url = HOST_NAME + "/user";

  switch (op) {
    case "login":
      url += "/login";
      return await axios.post(url, authData);

    case "register":
      url += "/signup";
      return axios.put(url, authData);

    default:
      return "Not An Invalid Op";
  }
}
