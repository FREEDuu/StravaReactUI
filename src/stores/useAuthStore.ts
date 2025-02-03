import { create } from 'zustand';
import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const AUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=read,activity:read_all`;

const useAuthStore = create((set, get) => ({
  token: localStorage.getItem("strava_token") || null,
  user: JSON.parse(localStorage.getItem("strava_user") || "null"),
  isAuthenticated: !!localStorage.getItem("strava_token"),

  logAuthInfo: () => {
    console.log("--AUTH INFO--");
    console.log("token", localStorage.getItem("strava_token"));
    console.log("user", JSON.parse(localStorage.getItem("strava_user") || "null"));
    console.log("isAuthenticated", localStorage.getItem("strava_token") ? "true" : "false");
  },

  login: () => {
    window.location.href = AUTH_URL;
  },

  handleAuthRedirect: async (code: string) => {
    try {
      const response = await axios.post(
        "https://www.strava.com/oauth/token",
        new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: code,
          grant_type: "authorization_code",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("response.data", response.data);
      const data = response.data;
      if (data.access_token) {
        set({ token: data.access_token, user: data.athlete, isAuthenticated: true });
        localStorage.setItem("strava_token", data.access_token);
        localStorage.setItem("strava_user", JSON.stringify(data.athlete));
      }
      return true;
    } catch (error) {
      console.error("Error exchanging code for token", error);
      return false;
    }
  },

  logout: () => {
    set({ token: null, user: null, isAuthenticated: false });
    localStorage.removeItem("strava_token");
    localStorage.removeItem("strava_user");
  },
}));

export default useAuthStore;