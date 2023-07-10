import { FC, useState } from "react";
import { Input } from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { Button } from "@components/ui/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="grid gap-5 w-full h-full items-center"
    >
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
    </motion.div>
  );
};

export default Register;
