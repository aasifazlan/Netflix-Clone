import axios from "../lib/axios.js";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set,get) => ({
	user: null,
	isSigningUp: false,
	isCheckingAuth: true,
	isLoggingOut: false,
	isLoggingIn: false,
	signup: async ({email, username, password}) => {
		set({ isSigningUp: true });
		try {
			const response = await axios.post("/v1/auth/signup", {email, username, password});
			console.log("response:",response)
			
			set({ user: response.data.user, isSigningUp: false });
			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Signup failed");
			set({ isSigningUp: false, user: null });
		}
	},
	login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
			const response = await axios.post("/v1/auth/login", credentials);
			console.log("response:",response)
			console.log("user:",response.data.user)
			
			set({ user: response.data.user, isLoggingIn: false });
		} catch (error) {
			set({ isLoggingIn: false, user: null });
			toast.error(error.response.data.message || "Login failed");
		}
	},
	logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post("/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Logged out successfully");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Logout failed");
		}
	},
	authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get("/api/v1/auth/authCheck");

			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
            console.log("error", error.message)
			set({ isCheckingAuth: false, user: null });
			toast.error(error.response.data.message || "An error occurred");
		}
	},
}));