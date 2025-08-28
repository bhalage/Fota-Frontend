import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm = ({ onSubmit, loading, error, email, setEmail, password, setPassword }) => {
  const formik = useFormik({
    initialValues: {
      email: email || "",
      password: password || "",
    },
    enableReinitialize: true, // keeps values synced with props
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      // update parent states before submit
      setEmail(values.email);
      setPassword(values.password);
      onSubmit(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formik.values.email}
          onChange={(e) => {
            formik.handleChange(e);
            setEmail(e.target.value);
          }}
          onBlur={formik.handleBlur}
          className="w-full p-2 mb-1 border border-gray-300 rounded"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-600 mb-2">{formik.errors.email}</p>
        ) : <div className="mb-2"></div>}

        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formik.values.password}
          onChange={(e) => {
            formik.handleChange(e);
            setPassword(e.target.value);
          }}
          onBlur={formik.handleBlur}
          className="w-full p-2 mb-1 border border-gray-300 rounded"
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-600 mb-2">{formik.errors.password}</p>
        ) : <div className="mb-2"></div>}

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-xs mt-4 text-gray-600">
        By signing in, I agree to the <strong>Privacy Policy.</strong>
      </p>
      <p className="text-center text-xs mt-4 text-gray-600">
        Don't have an account{" "}
        <Link className="text-blue-500 font-bold" to="/signup">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
