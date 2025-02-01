import React from "react";
import LoginButton from "../components/LoginButton";

const Login: React.FC = () => {
  return (
      <div className="w-full max-w-md p-6 bg-gray-900 shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold">Benvenuto su Run-up</h1>
        <h2 className="text-lg mt-2">Accedi con un click, con Strava</h2>
        <div className="mt-4">
          <LoginButton />
        </div>
      </div>
  );
};

export default Login;
