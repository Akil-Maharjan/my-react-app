import React from 'react'

function User() {
    const user = {
  "id": 1,
  "firstName": "Emily",
  "age": 28,
  "gender": "female",
  "email": "emily.johnson@x.dummyjson.com",
  "phone": "+81 965-431-3024",
  "birthDate": "1996-5-30",
  "image": "https://dummyjson.com/icon/emilys/128",
  "address": {
    "address": "626 Main Street",
    "city": "Phoenix",
    "state": "Mississippi",
    "coordinates": {
      "lat": -77.16213,
      "lng": -92.084824
    },
    "country": "United States"
  },
  "macAddress": "47:fa:41:18:ec:eb",
  "university": "University of Wisconsin--Madison",
  "company": {
    "department": "Engineering",
    "name": "Dooley, Kozey and Cronin",
    "title": "Sales Manager",
    "address": {
      "address": "263 Tenth Street",
      "city": "San Francisco",
      "state": "Wisconsin",
      "stateCode": "WI",
      "postalCode": "37657",
      "coordinates": {
        "lat": 71.814525,
        "lng": -161.150263
      },
      "country": "United States"
    }
  },

};
  return (
    <>
    <div className='flex items-center justify-center p-6'>
      <div className='bg-white/90 shadow-2xl rounded-3xl p-8 max-w-md w-full flex flex-col items-center'>
        <img src={user.image} alt={user.firstName} className='h-32 w-32 rounded-full border-4 border-green-400 shadow-lg mb-4' />
        <h1 className='text-3xl font-extrabold text-green-800 mb-2'>{user.firstName}</h1>
        <p className='text-green-500 mb-4'>Age: {user.age}</p>
        <div className='w-full text-left space-y-2 text-gray-700'>
          <p><span className='font-semibold text-green-700'>Email:</span> {user.email}</p>
          <p><span className='font-semibold text-green-700'>Phone:</span> {user.phone}</p>
          <p><span className='font-semibold text-green-700'>Gender:</span> {user.gender}</p>
            <p><span className='font-semibold text-green-700'>Birth Date:</span> {user.birthDate}</p>
        </div>
        <div className='w-full text-left space-y-2 text-gray-700'>
          <p><span className='font-semibold text-green-700'>Address:</span> {user.address.address}, {user.address.city}, {user.address.state}, {user.address.country}</p>
          <p><span className='font-semibold text-green-700'>University:</span> {user.university}</p>
          <p><span className='font-semibold text-green-700'>Company:</span> {user.company.name}</p>
            <p><span className='font-semibold text-green-700'>Department:</span> {user.company.department}</p>  
        </div>
      </div>
    </div>
    </>
  )
}

export default User