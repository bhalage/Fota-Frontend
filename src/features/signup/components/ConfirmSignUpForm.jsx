import React from "react";
import fevlogo from "../../../assets/fevlogo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Input } from "antd";

const ConfirmSignUpForm = ({ otp, setOtp, handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      otp: otp || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(6, "OTP must be exactly 6 digits")
        .required("OTP is required"),
    }),
    onSubmit: (values) => {
      setOtp(values.otp);
      handleSubmit(values.otp);
    },
  });

  return (
    <>    <Form layout="vertical" onFinish={formik.handleSubmit}>
            {/* OTP Input */}
            <Form.Item
              label="OTP"
              validateStatus={formik.touched.otp && formik.errors.otp ? "error" : ""}
              help={formik.touched.otp && formik.errors.otp}
            >
              <Input.OTP
                length={6}
                id="otp"
                value={formik.values.otp}
                onChange={(value) => {
                  formik.setFieldValue("otp", value);
                  setOtp(value);
                }}
                onBlur={formik.handleBlur}
                placeholder="Enter 6 digit OTP"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Confirm Signup
              </Button>
            </Form.Item>
          </Form>
       </>
  );
};

export default ConfirmSignUpForm;
