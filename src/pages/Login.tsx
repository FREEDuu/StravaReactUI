import LoginButton from "../components/LoginButton";
import React from "react";

const Login: React.FC = () => { 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 shadow-lg rounded-lg text-center bg-white">
        <h1 className="text-3xl font-bold">Benvenuto su Run-up</h1>
        <h2 className="text-lg mt-2">Accedi con un click, con Strava</h2>
        <div className="mt-4">
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;