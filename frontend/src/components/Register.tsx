import { FC, useState } from "react";
import { Input } from "@ui/Input";
import { Label } from "@ui/Label";
import { Button } from "@ui/Button";
import { useNavigate } from "react-router-dom";
import FadeOutTransition from "@components/FadeOutTransition";
import { authUserApi } from "@api/auth";
import AuthData from "@/types/authData";
import Loader from "./ui/Loader";

interface RegisterProps {}

const initValues = { username: "", password: "", confirm_password: "" };

const initState = { isLoading: false, error: "", values: initValues };

const Register: FC<RegisterProps> = () => {
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

  async function onSubmit() {
    console.log(state.values);
    if (state.values.username.length === 0) {
      setState((prev) => ({
        ...prev,
        error: "Username is required",
      }));
      return;
    }

    if (state.values.password.length === 0) {
      setState((prev) => ({
        ...prev,
        error: "Password is required",
      }));
      return;
    }

    if (state.values.password !== state.values.confirm_password) {
      setState((prev) => ({
        ...prev,
        error: "Passwords are not matching",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      const token = await authUserApi(
        {
          password: state.values.password,
          username: state.values.username,
        } as AuthData,
        "register"
      );
      if (typeof token === "object" && token.status === 200) {
        localStorage.setItem("auth_token", token.data.user.token);
      }
      setState(initState);
      navigate("/game");
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
      <div className="max-w-xl  border p-10 rounded-xl grid gap-5 w-full h-full items-center min-w-lg">
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="username">username</Label>
          <Input
            onChange={inputHandler}
            type="text"
            id="username"
            placeholder="username"
            name="username"
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="password">password</Label>
          <Input
            onChange={inputHandler}
            type="password"
            id="password"
            placeholder="password"
            name="password"
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="password">confirm password</Label>
          <Input
            onChange={inputHandler}
            type="password"
            id="confirm_password"
            name="confirm_password"
            placeholder="confirm password"
          />
        </div>
        {state.isLoading ? (
          <Loader />
        ) : (
          <>
            <Button onClick={() => onSubmit()}>Register</Button>
            <Button variant={"outline"} onClick={() => navigate("/auth/login")}>
              Login Instead
            </Button>
            <p className="text-red-500">{state.error ? state.error : ""}</p>{" "}
          </>
        )}
      </div>
    </FadeOutTransition>
  );
};

export default Register;
