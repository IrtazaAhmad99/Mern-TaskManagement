import React from 'react'
import { useState } from "react";
import { AuthAPI } from '../axiosConfig';
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");

    const handleVerify = async () => {
        try {
            const res = await API.post("/auth/verify-otp", {
                email,
                otp,
            });

            alert(res.data.message);

            navigate("/"); // go to login
        } catch (err) {
            alert(err.response?.data?.message || "OTP failed");
        }
    };
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4 text-center">
                    Verify OTP
                </h2>

                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                />

                <button
                    onClick={handleVerify}
                    className="bg-blue-500 text-white w-full p-2"
                >
                    Verify
                </button>
            </div>
        </div>
    )
}

export default VerifyOTP