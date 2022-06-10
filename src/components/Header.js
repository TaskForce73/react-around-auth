import logo from "../images/header.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Around US" className="header__image" />
    </header>
  );
}

export default Header;
