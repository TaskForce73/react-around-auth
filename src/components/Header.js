import React from "react";
import headerLogo from "../images/header.svg";
import NavBar from "./NavBar";

const Header = ({ isLoggedIn, handleLogout, user }) => {
  return (
    <header className='header'>
      <img className='header__image' alt='Around the U.S. logo' src={headerLogo} />
      <NavBar
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        user={user}
      />
    </header>
  );
};

export default Header;
