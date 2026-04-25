import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthAPI } from "../axiosConfig";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  }
  const validationSchema = Yup.object({

    email: Yup.string().email("Invalid email format").required("Email is required"),

    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
  const [loading, setLoading] = useState(false);

  const handlelogin = async () => {
    try {
      setLoading(true);

      const res = await AuthAPI.handleLogin("/auth/login", form);
      localStorage.setItem("token", res.data.token);

      if (res.data.user.role === "admin") {
        navigate("/users");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      alert(error.res?.data?.message || "login failed");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
     initialValues,
    validationSchema,
    onSubmit: handlelogin,
  })
  return (
     <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

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

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-blue-500 text-white w-full p-2 mt-2 disabled:opacity-50"
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>


        <p className="text-sm mt-3 text-center">
          Don’t have an account?{" "}
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

export default Login