import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async ({ emailId, password }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (!data) {
        throw new Error(data.message || "Login failed");
      }
      dispatch(addUser(data));
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      console.error("Login Error:", err.message);
      throw err;
    }
  };

  const formik = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },

    validationSchema: Yup.object({
      emailId: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&]/,
          "Password must contain at least one special character",
        )
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        await handleLogin(values);
        navigate("/assignment/practice");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form className="auth-form" onSubmit={formik.handleSubmit}>
      <h3>Login</h3>

      <div className="input-container">
        <label>Email:</label>
        <input
          type="email"
          name="emailId"
          placeholder="Enter emailid"
          value={formik.values.emailId || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.emailId && formik.errors.emailId && (
          <p className="error">{formik.errors.emailId}</p>
        )}
      </div>

      <div className="input-container">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formik.values.password || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="error">{formik.errors.password}</p>
        )}
      </div>

      <button className="auth-btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
