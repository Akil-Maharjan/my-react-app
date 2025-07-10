import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Button } from '@material-tailwind/react';

function ArrayData() {
  const [data, setData] = useState([]);

  const generateUser = () => {
    const randomUser = {
      userId: faker.string.uuid(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
    setData((currentData) => [...currentData, randomUser]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <Button onClick={generateUser} color="blue">
          Generate New User
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((user) => (
          <div
            key={user.userId}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <img
              src={user.avatar}
              alt={`${user.username}'s avatar`}
              className="w-24 h-24 rounded-full mb-4 border-4 border-gray-200"
            />
            <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
            <p className="text-md text-gray-500 mb-4">{user.email}</p>
            <div className="text-sm text-gray-600 space-y-1 text-left">
              <p>
                <strong>Password:</strong>{' '}
                <span className="font-mono bg-gray-200 px-1 rounded">{user.password}</span>
              </p>
              <p>
                <strong>Born:</strong> {user.birthdate.toLocaleDateString()}
              </p>
              <p>
                <strong>Joined:</strong> {user.registeredAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArrayData;
