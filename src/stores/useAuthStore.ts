import { create } from 'zustand';
import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const AUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=read,activity:read_all`;

const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  
  login: () => {
    window.location.href = AUTH_URL;
  },

  handleAuthRedirect: async (code: number) => {
    try {
      const response = await axios.post("https://www.strava.com/oauth/token", {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      if (data.access_token) {
        set({ token: data.access_token, user: data.athlete, isAuthenticated: true });
        localStorage.setItem("strava_token", data.access_token);
      }
    } catch (error) {
      console.error("Error exchanging code for token", error);
    }
  },

  logout: () => {
    set({ token: null, user: null, isAuthenticated: false });
    localStorage.removeItem("strava_token");
  },
}));

export default useAuthStore;