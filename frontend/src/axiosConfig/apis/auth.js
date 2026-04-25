import axios from "axios";
import axiosInstance from "../axios"

class Routes {
    async handleSignup(data) {
        try {
            const response = await axiosInstance.post("/auth/signup", data)
            console.log(response)
            return response.data
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }
    async handleLogin(data) {
        try {
            const response = await axiosInstance.post("/auth/login",data)
            return response.data
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }
    async verifyOtp(data){
        try {
            const response = await axiosInstance.post("/auth/verify-otp",data)
            return response.data
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }

}
export default new Routes()