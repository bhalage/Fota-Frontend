import React from "react";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Input } from "antd";

const SignUpForm = ({ user, setUser, handleSubmit, loading }) => {
  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
      confirmPassword: user?.confirmPassword || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      name: Yup.string()
        .min(6, "Name must be at least 6 characters")
        .required("Name is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      setUser(values);
      handleSubmit(values);
    },
  });

  return (
    <>
          <Form layout="vertical" onFinish={formik.handleSubmit}>
            {/* Name */}
            <Form.Item
              label="Name"
              validateStatus={
                formik.touched.name && formik.errors.name ? "error" : ""
              }
              help={formik.touched.name && formik.errors.name}
            >
              <Input
                id="name"
                placeholder="Enter Name"
                value={formik.values.name}
                onChange={(e) => {
                  formik.handleChange(e);
                  setUser({ ...user, name: e.target.value });
                }}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label="Email"
              validateStatus={
                formik.touched.email && formik.errors.email ? "error" : ""
              }
              help={formik.touched.email && formik.errors.email}
            >
              <Input
                id="email"
                type="email"
                placeholder="Enter Email"
                value={formik.values.email}
                onChange={(e) => {
                  formik.handleChange(e);
                  setUser({ ...user, email: e.target.value });
                }}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label="Password"
              validateStatus={
                formik.touched.password && formik.errors.password ? "error" : ""
              }
              help={formik.touched.password && formik.errors.password}
            >
              <Input.Password
                id="password"
                placeholder="Enter Password"
                value={formik.values.password}
                onChange={(e) => {
                  formik.handleChange(e);
                  setUser({ ...user, password: e.target.value });
                }}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              label="Confirm Password"
              validateStatus={
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
                  ? "error"
                  : ""
              }
              help={
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
              }
            >
              <Input.Password
                id="confirmPassword"
                placeholder="Enter Confirm Password"
                value={formik.values.confirmPassword}
                onChange={(e) => {
                  formik.handleChange(e);
                  setUser({ ...user, confirmPassword: e.target.value });
                }}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            {/* Submit button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </Form.Item>
          </Form>

          {/* Redirect to sign in */}
          <p className="text-center text-xs mt-4 text-gray-600">
            Already have an account?{" "}
            <Link className="text-blue-500 font-bold" to="/">
              Sign In
            </Link>
          </p>
       </>
  );
};

export default SignUpForm;
