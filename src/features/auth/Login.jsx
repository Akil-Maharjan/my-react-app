import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import { useLoginUserMutation } from './authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectIsAuthenticated } from './authSlice';
import toast from 'react-hot-toast';
import Header from '../../components/Header';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [loginUser, ] = useLoginUserMutation();

  if (isAuthenticated) {
    navigate('/'); // Redirect if already logged in
    return null;
  }

  return (
    <div className='flex justify-center items-center h-full p-5'>
      <Card className="w-96">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
           onSubmit={async (values, { setSubmitting }) => {
  try {
    const response = await loginUser(values).unwrap();
    
    // Store token securely
    localStorage.setItem('token', response.token);
    dispatch(setUser(response.user));
    
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
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            )}
          </Formik>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Typography
              as={Link}
              to="/register"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

