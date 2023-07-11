import { FC } from "react";
import { Outlet } from "react-router-dom";

interface AuthProps {}

const Auth: FC<AuthProps> = () => {
  return (
    <div className="min-h-screen w-full flex items-center">
      <div className="container max-w-xl  mx-auto border p-10 rounded-xl">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Auth;
