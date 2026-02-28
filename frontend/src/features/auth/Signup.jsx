import { useFormik } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "../../utils/constants";

const Signup = ({ onSignupSuccess }) => {
  const handleSignup = async ({ firstName, lastName, emailId, password }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, emailId, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (!data) {
        throw new Error(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup Error:", err.message);
      throw err;
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(4, "First Name must be at least 4 characters")
        .required("First Name is required"),

      lastName: Yup.string()
        .min(4, "Last Name must be at least 4 characters")
        .required("Last Name is required"),

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

    onSubmit: async (values, { resetForm }) => {
      try {
        await handleSignup(values);
        onSignupSuccess();
        resetForm();
      } catch (error) {
        alert("Signup failed: " + error.message);
      }
    },
  });

  return (
    <form className="auth-form" onSubmit={formik.handleSubmit}>
      <h3>Sign Up</h3>

      <div className="input-container">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="Rahul"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.firstName && formik.errors.firstName
              ? "error-input"
              : ""
          }
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <p className="error">{formik.errors.firstName}</p>
        )}
      </div>

      <div className="input-container">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Kumar"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.lastName && formik.errors.lastName
              ? "error-input"
              : ""
          }
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <p className="error">{formik.errors.lastName}</p>
        )}
      </div>

      <div className="input-container">
        <label>Email</label>
        <input
          type="email"
          name="emailId"
          placeholder="your@email.com"
          value={formik.values.emailId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.emailId && formik.errors.emailId ? "error-input" : ""
          }
        />
        {formik.touched.emailId && formik.errors.emailId && (
          <p className="error">{formik.errors.emailId}</p>
        )}
      </div>

      <div className="input-container">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.password && formik.errors.password
              ? "error-input"
              : ""
          }
        />
        {formik.touched.password && formik.errors.password && (
          <p className="error">{formik.errors.password}</p>
        )}
      </div>

      <button className="auth-btn" type="submit">
        Signup
      </button>
    </form>
  );
};

export default Signup;
