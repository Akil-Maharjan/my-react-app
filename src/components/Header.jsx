import React from 'react'
import { NavLink } from 'react-router'

function Header() {
  return (
    <div>
        <header className='header bg-black text-white p-4 flex justify-between items-center lg:px-50'>
            <h1 className='text-2xl font-bold'>My Application</h1>
            <nav>
            <ul className='flex space-x-6'>
                <NavLink to="/" className="text-white hover:text-gray-300" activeclassname="text-gray-300">Home</NavLink>
                <NavLink to="/about" className="text-white hover:text-gray-300" activeclassname="text-gray-300">About</NavLink>
                <NavLink to="/contact" className="text-white hover:text-gray-300" activeclassname="text-gray-300">Contact</NavLink>
                <NavLink to="/recipe" className="text-white hover:text-gray-300" activeclassname="text-gray-300">Recipe</NavLink>
                <NavLink to={"/user-form"} className="text-white hover:text-gray-300" activeclassname="text-gray-300">User Form</NavLink>
                
            </ul>
            </nav>
        </header>
    </div>
  )
}

export default Header