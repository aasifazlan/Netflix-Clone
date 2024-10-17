import axios from "axios";

const axiosInstance = axios.create({
	// baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
	baseURL: "http://localhost:5000/api",
	withCredentials: true, // send cookies to the server
});
console.log("Axios baseURL:", axiosInstance.defaults.baseURL);
export default axiosInstance;