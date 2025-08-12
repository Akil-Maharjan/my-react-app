// components/Header.jsx
import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, selectIsAuthenticated, selectCurrentUser } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
    toast.success('Logged out successfully');
    setIsMenuOpen(false);
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
      <NavLink to="/recipe" className={getNavLinkClass}>Recipes</NavLink>
    </>
  );

  // Links only for authenticated users
  const authLinks = isAuthenticated && (
    <>
      
      <NavLink to="/user-form" className={getNavLinkClass}>User Form</NavLink>
      <NavLink to="/articles" className={getNavLinkClass}>Articles</NavLink>
      <NavLink to="/product" className={getNavLinkClass}>Products</NavLink>
      <NavLink to="/carts" className={getNavLinkClass}>Cart</NavLink>
    </>
  );

  return (
    <header className='header bg-black text-white p-4 lg:px-8'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>My App</h1>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center px-2 py-1 border rounded text-white border-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex'>
          <ul className='flex items-center space-x-6'>
            {commonLinks}
            {authLinks}
          </ul>
        </nav>

        {/* Auth section */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              
              <Button 
                color="white" 
                onClick={handleLogout}
                className="whitespace-nowrap"
              >
                Log Out
              </Button>
            </>
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 p-4">
          <nav className="flex flex-col space-y-4">
            {commonLinks}
            {authLinks}
          </nav>
          <div className="mt-4 flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                
                <Button 
                  color="white" 
                  onClick={handleLogout}
                  fullWidth
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button color="white" fullWidth>Log In</Button>
                </Link>
                <Link to="/register">
                  <Button color="white" fullWidth>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;