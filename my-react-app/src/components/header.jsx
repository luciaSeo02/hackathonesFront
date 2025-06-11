import React from "react";
import { Link } from "react-router-dom";

const Header = () => (

    <header className="header">

        <div className="logo"> LOGO </div>

            <nav>

            <Link to="/hackathons"> HackNMeet </Link>
            <Link to="/info"> Información </Link>
            <Link to="/contacto"> Contacto </Link>

            </nav>

        <div className="search_bar">

            <input type="text" placeholder="Buscar hackathon..." />

        </div>


    <div className="auth_buttons">

    <Link to="/login">
        <button> Iniciar sesión </button>
    </Link>
    <Link to="/register">
        <button> Registrarse </button>
    </Link>

    </div>

</header>

);

export default Header;