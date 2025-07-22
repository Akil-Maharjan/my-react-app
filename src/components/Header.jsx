import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Common function for NavLink classes based on active state
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-300 font-bold' // Style for active link
      : 'text-white hover:text-gray-300'; // Style for inactive link

  // Reusable NavLink elements
  const navLinks = (
    <>
      <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
      <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
      <NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink>
      <NavLink to="/recipe" className={getNavLinkClass}>Recipe</NavLink>
      <NavLink to="/user-form" className={getNavLinkClass}>User Form</NavLink>
      <NavLink to="/articles" className={getNavLinkClass}>Article</NavLink>
    </>
  );

  return (
    <header className='header bg-black text-white p-4 lg:px-8'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>My Application</h1>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex'>
          <ul className='flex items-center space-x-6'>
            {navLinks}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4">
          <ul className='flex flex-col items-center space-y-4'>
            {navLinks}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;