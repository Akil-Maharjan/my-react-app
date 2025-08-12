import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Typography } from '@material-tailwind/react'
import { deleteUser } from './userSlice'
import { useNavigate } from 'react-router'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {selectAllUsers} from './userSlice'
function ReadMore({ text, maxLength = 80 }) {
  const [expanded, setExpanded] = useState(false)
  if (!text) return null
  if (text.length <= maxLength) return <span>{text}</span>
  return (
    <span>
      {expanded ? text : text.slice(0, maxLength) + '...'}
      <button
        className="ml-2 text-blue-600 underline text-xs"
        onClick={() => setExpanded((v) => !v)}
        type="button"
      >
        {expanded ? 'Show less' : 'Read more'}
      </button>
    </span>
  )
}



function UserList() {
  const users = useSelector(selectAllUsers) || [];
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: 'Bitcount Single, Libre Baskerville, serif' }} className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center py-8">
      <Typography variant="h3" color="blue-gray" className="mb-8 font-bold">
        Registered Users
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {users.length === 0 ? (
          <Typography color="blue-gray" className="text-center col-span-full">
            No users found.
          </Typography>
        ) : (
          users.map(
            (
              {
                username,
                email,
                password,
                gender,
                habits,
                country,
                bio,
                idx
              },
              i
            ) => (
              <Card
                key={idx || i}
                className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 flex flex-col gap-2"
              >
                <Typography variant="h5" color="blue" className="font-bold mb-2">
                  {username}
                </Typography>
                <div className="text-sm text-gray-700">
                  <div>
                    <span className="font-semibold text-blue-700">Email:</span> {email}
                  </div>
                  <div>
                    <span className="font-semibold text-blue-700">Password:</span> {password}
                  </div>
                  <div>
                    <span className="font-semibold text-blue-700">Gender:</span> {gender}
                  </div>
                  <div>
                    <span className="font-semibold text-blue-700">Habits:</span>{' '}
                    {habits && habits.length > 0
                      ? habits.map((h) => (
                          <span key={h} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-2">
                            {h}
                          </span>
                        ))
                      : 'None'}
                  </div>
                  <div>
                    <span className="font-semibold text-blue-700">Country:</span> {country}
                  </div>
                  <div>
                    <span className="font-semibold text-blue-700">Bio:</span>
                    <div className="bg-blue-50 rounded p-2 mt-1 text-gray-800">
                      <ReadMore text={bio} maxLength={80} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between space-x-2 mt-4">
                  <Button
                    color="blue"
                    onClick={() => navigate(`/user-form/${idx}`)}
                    className="mt-2"
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    color="red"
                    onClick={() => dispatch(deleteUser(idx))}
                    className="mt-2"
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </Card>
            )
          )
        )}
      </div>
    </div>
  )
}

export default UserList