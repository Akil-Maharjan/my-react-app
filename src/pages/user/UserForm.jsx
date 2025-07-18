import { Checkbox, Input, Radio, Textarea, Typography, Button, Select, Option } from '@material-tailwind/react'
import { Formik } from 'formik'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import * as Yup from 'yup'
import { addUser, updateUser } from './userSlice';
import { nanoid } from '@reduxjs/toolkit';

function UserForm() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { idx } = useParams();
  const users = useSelector((state) => state.user.users);

  
  const editingUser = users.find((u) => u.idx === idx);
   
  const initialValues = editingUser
    ? {
        username: editingUser.username || '',
        email: editingUser.email || '',
        password: editingUser.password || '',
        gender: editingUser.gender || '',
        habits: Array.isArray(editingUser.habits) ? editingUser.habits : [],
        country: editingUser.country || '',
        bio: editingUser.bio || '',
      }
    : {
        username: '',
        email: '',
        password: '',
        gender: '',
        habits: [],
        country: '',
        bio: '',
      };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required').min(4, 'Username must be at least 4 characters').max(20, 'Username cannot exceed 20 characters'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(20, 'Password cannot exceed 20 characters'),
    gender: Yup.string().required('Gender is required'),
    habits: Yup.array().min(1, 'Select at least one habit'),
    country: Yup.string().required('Country is required'),
    bio: Yup.string().required('Bio is required').min(25, 'Bio must be at least 25 characters').max(200, 'Bio cannot exceed 200 characters'),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            if (editingUser) {
              dispatch(updateUser({ ...values, idx }));
              toast.success('User updated successfully!');
            } else {
              dispatch(addUser({ ...values, idx: nanoid() }));
              toast.success('User registered successfully!');
            }
            resetForm();
            nav('/user-list');
          } catch (error) {
            toast.error(error,'Operation failed!');
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, handleSubmit, setFieldValue, errors, touched, isSubmitting }) => (
          <form
            onSubmit={handleSubmit}
            className="max-w-md w-full p-8 bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl space-y-6"
            autoComplete="off"
          >
            <Typography variant="h4" color="blue-gray" className="text-center font-bold mb-2">
              {editingUser ? 'Update User' : 'User Registration'}
            </Typography>
            <div className="space-y-4">
              <Input
                label="Username"
                onChange={handleChange}
                value={values.username}
                name="username"
                color="blue"
                size="lg"
                autoComplete="off"
              />
              {errors.username && touched.username ? (
                <span className="text-red-500">{errors.username}</span>
              ) : null}
              <Input
                label="Email"
                onChange={handleChange}
                value={values.email}
                name="email"
                color="blue"
                size="lg"
                type="email"
                autoComplete="off"
              />
              {errors.email && touched.email ? (
                <span className="text-red-500">{errors.email}</span>
              ) : null}
              <Input
                label="Password"
                type="password"
                onChange={handleChange}
                value={values.password}
                name="password"
                color="blue"
                size="lg"
                autoComplete="off"
              />
              {errors.password && touched.password ? (
                <span className="text-red-500">{errors.password}</span>
              ) : null}
            </div>
            <div>
              <Typography className="mb-2 font-semibold text-blue-700">Select Gender</Typography>
              <div className="flex gap-10">
                <Radio
                  color="blue"
                  label="Male"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={values.gender === 'male'}
                />
                <Radio
                  color="pink"
                  label="Female"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={values.gender === 'female'}
                />
              </div>
            </div>
            {errors.gender && touched.gender ? (
              <span className="text-red-500">{errors.gender}</span>
            ) : null}

            <div>
              <Typography className="mb-2 font-semibold text-blue-700">Habits</Typography>
              <div className="flex gap-5 flex-wrap">
                {['reading', 'traveling', 'gaming'].map((habit) => (
                  <Checkbox
                    key={habit}
                    label={habit.charAt(0).toUpperCase() + habit.slice(1)}
                    name="habits"
                    value={habit}
                    onChange={handleChange}
                    checked={values.habits.includes(habit)}
                  />
                ))}
              </div>
            </div>
            {errors.habits && touched.habits ? (
              <span className="text-red-500">{errors.habits}</span>
            ) : null}
            <div>
              <Typography className="mb-2 font-semibold text-blue-700">Country</Typography>
              <Select
                label="Select Country"
                name="country"
                value={values.country}
                onChange={(val) => setFieldValue('country', val)}
                color="blue"
                required
              >
                <Option value="India">India</Option>
                <Option value="USA">USA</Option>
                <Option value="UK">UK</Option>
                <Option value="Canada">Canada</Option>
                <Option value="Nepal">Nepal</Option>
              </Select>
            </div>
            {errors.country && touched.country ? (
              <span className="text-red-500">{errors.country}</span>
            ) : null}
            <Textarea
              label="Bio"
              name="bio"
              value={values.bio}
              onChange={handleChange}
              color="blue"
              rows={4}
              className="resize-none"
            />
            {errors.bio && touched.bio ? (
              <span className="text-red-500">{errors.bio}</span>
            ) : null}
            <Button
              type="submit"
              color="blue"
              className="w-full rounded-full font-bold text-lg cursor-pointer hover:bg-blue-600 transition-colors duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (editingUser ? 'Updating...' : 'Submitting...') : (editingUser ? 'Update' : 'Submit')}
            </Button>
            <Button
              type="button"
              onClick={() => nav('/user-list')}
              color="gray"
              className="w-full rounded-full font-bold text-lg mt-2"
            >
              User-List
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default UserForm