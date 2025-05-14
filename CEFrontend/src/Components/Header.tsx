import logo from '../assets/Logo.png';
import './Header.css'

function Header() {
    return (
      <div className="header">
            <img className="logoImage" src={logo} alt="Logo" />
        </div>
  );
}

export default Header;