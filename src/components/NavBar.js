import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ isLoggedIn, handleLogout, user }) => {
  const location = useLocation();

  return isLoggedIn ? (
    <nav>
      <span className='header__user'>{user}</span>
      <Link className='header__link' to={'/signin'} onClick={handleLogout}>
        {'Log out'}
      </Link>
    </nav>
  ) : (
    <nav>
      <Link
        className='header__link'
        to={location.pathname === '/signin' ? '/signup' : '/signin'}
      >
        {location.pathname === '/signin' ? 'Sign up' : 'Log in'}
      </Link>
    </nav>
  );
};

export default NavBar;