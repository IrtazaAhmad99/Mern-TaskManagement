import React from 'react'
import { AuthAPI } from '../axiosConfig';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  }
  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),

    email: Yup.string().email("Invalid email format").required("Email is required"),

    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);

      const res = await AuthAPI.handleSignup("/auth/signup", form);

      alert(res.data.message);

      navigate("/verify-otp", { state: { email: form.email } });

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSignup,
  })
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Create Account
        </h2>

        {/* NAME */}
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-1"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mb-2">
            {formik.errors.name}
          </p>
        )}

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-1"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mb-2">
            {formik.errors.email}
          </p>
        )}

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-1"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm mb-2">
            {formik.errors.password}
          </p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-green-500 text-white w-full p-2 mt-2 disabled:opacity-50"
        >
          {formik.isSubmitting ? "Creating..." : "Register"}
        </button>

        {/* LOGIN REDIRECT */}
        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  )
}

export default Signup