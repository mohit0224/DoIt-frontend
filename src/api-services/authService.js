import axiosInstance from "@/utils/axiosInstance";

class authService {
	signup = async (data) => await axiosInstance.post("/users/", data);
	login = async (data) => await axiosInstance.post("/users/login", data);
	logout = async () => await axiosInstance.post("/users/logout");
	checkCookie = async () => await axiosInstance.get("/users/check-cookie");
	currentUser = async () => await axiosInstance.get("/users/current-user");
}

const authServices = new authService();

export default authServices;
