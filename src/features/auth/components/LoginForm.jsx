import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Input, Typography } from "antd";

const { Text } = Typography;

const LoginForm = ({ onSubmit, loading, error, email, setEmail, password, setPassword }) => {
  const formik = useFormik({
    initialValues: {
      email: email || "",
      password: password || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      setEmail(values.email);
      setPassword(values.password);
      onSubmit(values);
    },
  });

  return (
    <>
      <Form layout="vertical" onFinish={formik.handleSubmit} className="flex flex-col space-y-4">
        {/* Email */}
        <Form.Item
          label="Email"
          validateStatus={formik.touched.email && formik.errors.email ? "error" : ""}
          help={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
        >
          <Input
            id="email"
            type="email"
            value={formik.values.email}
            onChange={(e) => {
              formik.handleChange(e);
              setEmail(e.target.value);
            }}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          validateStatus={formik.touched.password && formik.errors.password ? "error" : ""}
          help={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
        >
          <Input.Password
            id="password"
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
              setPassword(e.target.value);
            }}
            onBlur={formik.handleBlur}
            placeholder="Enter your password"
          />
        </Form.Item>

        {/* Server-side error */}
        {error && <Text type="danger">{error}</Text>}

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form.Item>
      </Form>

      {/* Footer text */}
      <p className="text-center text-xs mt-4 text-gray-600">
        By signing in, I agree to the <strong>Privacy Policy.</strong>
      </p>
      <p className="text-center text-xs mt-4 text-gray-600">
        Don&apos;t have an account{" "}
        <Link className="text-blue-500 font-bold" to="/signup">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
