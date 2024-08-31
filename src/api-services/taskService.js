import axiosInstance from "@/utils/axiosInstance";

class taskService {
	createTask = async(data)=> await axiosInstance.post("/tasks",data);

	getAllTasks = async () => await axiosInstance.get("/tasks");
	getTodayTasks = async () => await axiosInstance.get("/tasks/get-today-task");
	getImportantTasks = async () => await axiosInstance.get("/tasks/get-important-tasks");
	getCompletedTasks = async () => await axiosInstance.get("/tasks/get-completed-tasks");

	isCompleted = async (id, data) => await axiosInstance.put(`/tasks/iscompleted/${id}`, data);
	isImportant = async (id, data) => await axiosInstance.put(`/tasks/isimportant/${id}`, data);
}

const taskServices = new taskService();
export default taskServices;
