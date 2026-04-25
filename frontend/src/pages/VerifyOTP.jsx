import React from 'react'
import { useState } from "react";
import { AuthAPI } from '../axiosConfig';
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialValues = {
    otp: "",
  }
   const validationSchema = Yup.object({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
  });


    const email = location.state?.email;

    
    const [otp, setOtp] = useState("");

    const handleVerify = async (values) => {
        try {
            const res = await AuthAPI.verifyOtp({
                email,
                otp: values.otp
            });

            alert(res?.message);

            navigate("/"); 
        } catch (error) {
            alert(error.res?.data?.message || "OTP failed");
        }
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleVerify,
      })
      
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Verify OTP
        </h2>

        <p className="text-sm text-gray-600 mb-3 text-center">
          Enter the OTP sent to your email
        </p>

        <input
          name="otp"
          type="text"
          placeholder="Enter 6-digit OTP"
          className="border p-2 w-full mb-1 text-center tracking-widest"
          value={formik.values.otp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.otp && formik.errors.otp && (
          <p className="text-red-500 text-sm mb-2 text-center">
            {formik.errors.otp}
          </p>
        )}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-blue-500 text-white w-full p-2 mt-2 disabled:opacity-50"
        >
          {formik.isSubmitting ? "Verifying..." : "Verify"}
        </button>

        <p className="text-sm mt-3 text-center">
          Go back to{" "}
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
    )
}

export default VerifyOTP