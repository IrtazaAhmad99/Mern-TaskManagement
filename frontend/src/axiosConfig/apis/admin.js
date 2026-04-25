import axios from "axios";
import axiosInstance from "../axios"

class Routes {
    async getALLUsers() {
        try {
            const response = await axiosInstance.get("/user/getAllUsers")
            return response.data
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }
    async updateUsers(id,data) {
        try {
            const response = await axiosInstance.put(`/user/updateUser/${id}`,data)
            return response.data
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }
    async deleteUsers(id,data){
        try {
            const response = await axiosInstance.delete(`/user/deleteUser/${id}`)
            return response.data
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }

}
export default new Routes()