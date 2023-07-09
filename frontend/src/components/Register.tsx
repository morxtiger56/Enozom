import { FC, useState } from "react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";

interface RegisterProps {}

const initValues = { username: "", password: "" };

const initState = { isLoading: false, error: "", values: initValues };

const Register: FC<RegisterProps> = () => {
  const [state, setState] = useState(initState);
  const [sent, setSent] = useState(false);
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

  return (
    <>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="username">username</Label>
        <Input
          onChange={inputHandler}
          type="text"
          id="username"
          placeholder="username"
        />
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="password">password</Label>
        <Input
          onChange={inputHandler}
          type="password"
          id="password"
          placeholder="password"
        />
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="password">confirm password</Label>
        <Input
          onChange={inputHandler}
          type="password"
          id="confirm_password"
          placeholder="confirm password"
        />
      </div>
      <Button>Register</Button>

      <Button variant={"outline"} onClick={() => navigate("/auth/login")}>
        Login Instead
      </Button>
    </>
  );
};

export default Register;
