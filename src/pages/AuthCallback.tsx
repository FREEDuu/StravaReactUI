// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/useAuthStore";

const AuthCallback = () => {
  const navigate = useNavigate();
  const handleAuthRedirect = useAuthStore((state:any) => state.handleAuthRedirect);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      handleAuthRedirect(code).then((success:any) => {
        if (success) {
          navigate("/home"); // Redirect to home after successful login
        } else {
          navigate("/login"); // Redirect to login on failure
        }
      });
    } else {
      navigate("/login");
    }
  }, [navigate, handleAuthRedirect]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
