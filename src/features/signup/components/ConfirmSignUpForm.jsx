import React from 'react'
import fevlogo from "../../../assets/fevlogo.png"
import { useFormik } from 'formik'
import * as Yup from 'yup'
const ConfirmSignUpForm = ({ otp, setOtp, handleSubmit }) => {
    const formik = useFormik({
        initialValues: {
            otp: otp || '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            otp: Yup.string()
                .min(6, "OTP must be at least 6 digits")
                .required("OTP is required")
        }),
        onSubmit: (values) => {
            setOtp(values)
            handleSubmit(values)
        }
    })
    return (
        <>
            <div className="w-1/2 p-8">
                <img src={fevlogo} alt="fev logo" className="w-32" />
            </div>
            <div className='w-1/2 flex items-center justify-center'>
                <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
                    <form onSubmit={formik.handleSubmit}>
                        <label id='otp' className='block mb-2 text-sm font-medium text-gray-700'> OTP</label>
                        <input id='otp' className='w-full p-2 border border-gray-300 rounded mb-4'
                            placeholder='Enter OTP'
                            type='text'
                            required
                            value={formik.values.otp}
                            //    onChange={(e) => setOtp(e.target.value)} 
                            onChange={(e) => {
                                formik.handleChange(e);
                                setOtp(e.target.value)
                            }}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.otp && formik.errors.otp ? (<p className="text-red-600 mb-2">{formik.errors.otp}</p>) : <div className="mb-2"></div>}
                        <button type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            {/* {loading ? "Signing Up..." : "Sign Up"} */}
                            Confirm Signup
                        </button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default ConfirmSignUpForm 