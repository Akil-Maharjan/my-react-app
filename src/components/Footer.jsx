import React from 'react'

function Footer() {
  return (
    <div className='footer  bg-gray-500 p-3 flex flex-col  gap-6'>
        <div className='buttons flex gap-6'>
      <button className='p-3 w-[100px] bg-blue-400 hover:bg-blue-600 cursor-pointer text-white '>Previous</button>
      <button className='p-3 w-[100px] bg-blue-400 hover:bg-blue-600 cursor-pointer text-white '>Next</button>
      </div>
      <div className='copyright'>
        <h3>Powered BY Me</h3>
      </div>
    </div>
  )
}

export default Footer