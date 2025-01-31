import React from "react";
import useAuthStore from "../stores/useAuthStore"; 

const LoginButton: React.FC = () => {
  const login = useAuthStore((state: any) => state.login);

  return (
    <button
      onClick={login}
      className="text-black font-bold py-2 px-4 border border-orange-700 rounded hover:cursor-pointer hover:bg-orange-200 transition-colors duration-200"
    >
      Login con Strava
    </button>
  );
};

export default LoginButton;
