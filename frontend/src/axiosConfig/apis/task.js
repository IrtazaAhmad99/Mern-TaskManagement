import axios from "axios";
import axiosInstance from "../axios"

class Routes {
    async getAllTak() {
        try {
            const res = await axiosInstance.get("/task/getall");
            return res.data;
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }

    async createTask(data) {
        try {
            const res = await axiosInstance.post("/task/create",data);
            return res.data;
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }
    async UpdateTask(id, data) {
        try {
            const res = await axiosInstance.put(`/task/${id}`, data);
            return res.data;
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }
    async deleteTask(id) {
        try {
            const res = await axiosInstance.delete(`/task/delete/${id}`);
            return res.data;
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }

} 
export default new Routes()