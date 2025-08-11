import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import { useRegisterUserMutation } from './authApi';
import { useDispatch } from 'react-redux';
import { setUser } from './authSlice'; // Make sure this import matches your actual auth slice

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation();
  
  return (
    <div className='flex justify-center items-center h-full p-5'>
      <Card className="w-96">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting }) => {
  try {
    const response = await registerUser(values).unwrap();
    
    // Store token securely
    localStorage.setItem('token', response.token);
    // In your login mutation success handler
dispatch(setUser({ token: response.token, user: response.user }));
    
    // Redirect
    navigate('/');
    toast.success('Login successful');
  } catch (err) {
    console.error('Login failed:', err);
    toast.error(
      err.data?.message || 
      err.error || 
      'Connection failed. Try again later.'
    );
  } finally {
    setSubmitting(false);
  }
}}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <Input
                    label='Username'
                    name='username'
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                  />
                  {touched.username && errors.username && (
                    <Typography color="red" className="text-sm mt-1">
                      {errors.username}
                    </Typography>
                  )}
                </div>
                <div>
                  <Input
                    type='email'
                    label='Email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                  />
                  {touched.email && errors.email && (
                    <Typography color="red" className="text-sm mt-1">
                      {errors.email}
                    </Typography>
                  )}
                </div>
                <div>
                  <Input
                    type='password'
                    label='Password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                  />
                  {touched.password && errors.password && (
                    <Typography color="red" className="text-sm mt-1">
                      {errors.password}
                    </Typography>
                  )}
                </div>
                <Button type='submit' disabled={isSubmitting} fullWidth>
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </form>
            )}
          </Formik>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Typography
              as={Link}
              to="/login"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign in
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}