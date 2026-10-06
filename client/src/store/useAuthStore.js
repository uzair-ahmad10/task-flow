import {axiosInstance} from "../utils/axios.js";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isGoogleAuth: false,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);

      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error logging out");
      console.error("Logout error:", error);
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update profile");
      console.error("Logout error:", error);
    }
  },

  googleAuth: async (data) => {
    set({ isGoogleAuth: true });
    try {
      const res = await axiosInstance.post("/auth/google", data);

      if (res.data.messageInfo.signup) {
        set({ authUser: res.data.user });
        toast.success(res.data.messageInfo.message);
        
      } else {
        set({ authUser: res.data.user });
        toast.success(res.data.messageInfo.message);
        
      }
    } catch (error) {
      console.error("Google Auth error: ", error);
      toast.error(error.response?.data?.message || "Signup failed");
      set({ authUser: null });
    } finally {
      set({ isGoogleAuth: false });
    }
  },
  
}));
