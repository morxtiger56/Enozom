import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface AuthProps {}

const Auth: FC<AuthProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    console.log(authToken);
    if (!authToken || authToken.length === 0) {
      return;
    }
    navigate("/game");
  }, []);

  return (
    <div className="min-h-screen flex items-center  m-auto justify-center">
      <Outlet></Outlet>
    </div>
  );
};

export default Auth;
