import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles/Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        INICIO
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/Municipios">Municipios</NavLink>
        </li>
        <li>
          <NavLink to="/Barrios">Barrios</NavLink>
        </li>
        <li>
          <NavLink to="/Viviendas">Viviendas</NavLink>
        </li>
        <li>
          <NavLink to="/Personas">Personas</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
