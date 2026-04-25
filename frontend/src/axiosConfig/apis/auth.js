import axios from "axios";
import axiosInstance from "../axios"

class Routes {
    async handleSignup(data) {
        try {
            const response = await axiosInstance.post("/api/auth/signup", data)
            return response.data
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }
    async handleLogin(data) {
        try {
            const response = await axiosInstance.post("/api/auth/login",FormDataEvent)
            return response.data
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }
    async verifyOtp(){
        try {
            const response = await axiosInstance.post("/api/auth/verify-otp")
            return response.data
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }

}
export default new Routes()