import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, selectIsAuthenticated } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
    toast.success('Logged out successfully');
    setIsMenuOpen(false); // Close menu on logout
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-300 font-bold'
      : 'text-white hover:text-gray-300';

  // Common links for all users
  const commonLinks = (
    <>
      <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
      <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
      <NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink>
    </>
  );

  // Links only for authenticated users
  const authLinks = isAuthenticated && (
    <>
      <NavLink to="/user-list" className={getNavLinkClass}>User List</NavLink>
      <NavLink to="/recipe" className={getNavLinkClass}>Recipe</NavLink>
      <NavLink to="/user-form" className={getNavLinkClass}>User Form</NavLink>
      <NavLink to="/articles" className={getNavLinkClass}>Article</NavLink>
      <NavLink to="/product" className={getNavLinkClass}>Products</NavLink>
    </>
  );

  return (
    <header className='header bg-black text-white p-4 lg:px-8'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>My Application</h1>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center px-2 py-1 border rounded text-white border-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex'>
          <ul className='flex items-center space-x-6'>
            {commonLinks}
            {authLinks}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <Button 
              color="white" 
              onClick={handleLogout}
              className="whitespace-nowrap"
            >
              Log Out
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button color="white" className="whitespace-nowrap">Log In</Button>
              </Link>
              <Link to="/register">
                <Button color="white" className="whitespace-nowrap">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 bg-black px-4 py-2 rounded shadow-lg">
          <ul className='flex flex-col items-center space-y-4'>
            {commonLinks}
            {authLinks}
            {isAuthenticated ? (
              <li>
                <Button 
                  color="white" 
                  onClick={handleLogout}
                  fullWidth
                >
                  Log Out
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="w-full">
                    <Button color="white" fullWidth>Log In</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="w-full">
                    <Button color="white" fullWidth>Register</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
// ...existing code...