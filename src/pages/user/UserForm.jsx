import { Checkbox, Input, Radio, Textarea, Typography, Button, Select, Option } from '@material-tailwind/react'
import { Formik } from 'formik'

function UserForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          gender: '',
          habits: [],
          country: '',
          bio: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleChange, values, handleSubmit, setFieldValue }) => (
          <form
            onSubmit={handleSubmit}
            className="max-w-md w-full p-8 bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl space-y-6"
          >
            <Typography variant="h4" color="blue-gray" className="text-center font-bold mb-2">
              User Registration
            </Typography>
            <div className="space-y-4">
              <Input
                label="Username"
                onChange={handleChange}
                value={values.username}
                name="username"
                color="blue"
                size="lg"
                required
              />
              <Input
                label="Email"
                onChange={handleChange}
                value={values.email}
                name="email"
                color="blue"
                size="lg"
                type="email"
                required
              />
              <Input
                label="Password"
                type="password"
                onChange={handleChange}
                value={values.password}
                name="password"
                color="blue"
                size="lg"
                required
              />
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
            <div>
              <Typography className="mb-2 font-semibold text-blue-700">Habits</Typography>
              <div className="flex gap-5 flex-wrap">
                {['reading', 'traveling', 'gaming'].map((habit) => (
                  <Checkbox
                    key={habit}
                    label={habit.charAt(0).toUpperCase() + habit.slice(1)}
                    name="habits"
                    value={habit}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue('habits', [...values.habits, habit]);
                      } else {
                        setFieldValue('habits', values.habits.filter((h) => h !== habit));
                      }
                    }}
                    checked={values.habits.includes(habit)}
                  />
                ))}
              </div>
            </div>
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
                <Option value="Nepa">Nepal</Option>
              </Select>
            </div>
            <Textarea
              label="Bio"
              name="bio"
              value={values.bio}
              onChange={handleChange}
              color="blue"
              rows={3}
              className="resize-none"
            />
            <Button type="submit" color="blue" className="w-full rounded-full font-bold text-lg">
              Submit
            </Button>
          </form>
        )}
      </Formik>
       </div>
  )
}

export default UserForm