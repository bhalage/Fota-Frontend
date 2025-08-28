import React from 'react'
import fevlogo from '../../../assets/fevlogo.png'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const SignUpForm = ({ user, setUser, handleSubmit, loading }) => {

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: user?.password || '',
      confirmPassword: user?.confirmPassword || ''
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
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
    }),
    onSubmit: (values) => {
      setUser(values)
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
            <label 
            id='name'
            className='block mb-2 text-sm font-medium text-gray-700'> Name</label>
            <input 
            id='name'
            className='w-full p-2 border border-gray-300 rounded mb-4'
            placeholder='Enter Name'
            type='text' 
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
              setUser({ ...user, name: e.target.value });
            }}
            onBlur={formik.handleBlur}
            // onChange={(e) => setUser({ ...user, name: e.target.value })} 
            // required 
            />
            {formik.touched.name && formik.errors.name ? (
                <p className="text-red-600 mb-2">{formik.errors.name}</p>
              ) : <div className="mb-2"></div>  }
            <label 
            id='email'
            className='block mb-2 text-sm font-medium text-gray-700'> Email</label>
            <input 
            id='email'
            className='w-full p-2 border border-gray-300 rounded mb-4'
             placeholder='Enter Email' 
             type='email' value={formik.values.email}
            //  onChange={(e) => setUser({ ...user, email: e.target.value })} 
            onChange={(e) => {
              formik.handleChange(e);
              setUser({ ...user, email: e.target.value });
            }}
            onBlur={formik.handleBlur}
             />
             {
              formik.touched.email && formik.errors.email ? (
                <p className="text-red-600 mb-2">{formik.errors.email}</p>
              ) : <div className="mb-2"></div>
             }
            <label 
            id='password'
            className='block mb-2 text-sm font-medium text-gray-700' > Password</label>
            <input 
            id='password'
            className='w-full p-2 border border-gray-300 rounded mb-4'
            placeholder='Enter Password'
            type='password' 
            // value={user?.password}
            //  onChange={(e) => setUser({ ...user, password: e.target.value })} 
            // required
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
              setUser({ ...user, password: e.target.value }); 
            }}
            onBlur={formik.handleBlur}
             />
             {formik.touched.password && formik.errors.password ? (
                <p className="text-red-600 mb-2">{formik.errors.password}</p>
              ) : <div className="mb-2"></div>  } 
            <label className='block mb-2 text-sm font-medium text-gray-700'> Confirm Password</label>
            <input 
            id='confirmPassword'
            className='w-full p-2 border border-gray-300 rounded mb-4' 
            placeholder='Enter Confirm Password' 
            type='password'
            // value={user.confirmPassword}
            // onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            // required
            value={formik.values.confirmPassword}
            onChange={(e) => {
              formik.handleChange(e);
              setUser({ ...user, confirmPassword: e.target.value });
            }}
            onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <p className="text-red-600 mb-2">{formik.errors.confirmPassword}</p>
              ) : <div className="mb-2"></div>  }
            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >{loading ? "Signing Up..." : "Sign Up"}</button>
          </form>
          <p className="text-center text-xs mt-4 text-gray-600">Already have an account <Link className="text-blue-500 font-bold" to="/">Sign In</Link></p>
        </div>
      </div>

    </>
  )
}

export default SignUpForm