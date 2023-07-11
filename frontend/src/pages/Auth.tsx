import { FC } from "react";
import { Outlet } from "react-router-dom";

interface AuthProps {}

const Auth: FC<AuthProps> = () => {
  return (
    <div className="min-h-screen flex items-center  m-auto justify-center">
      <Outlet></Outlet>
    </div>
  );
};

export default Auth;
