import React from "react";
import nysl_logo from '../assets/img/nysl_logo.png';
import { NavLink } from 'react-router-dom';
import { useUserState } from '../utilites/firebase';
// importamos los iconos
import HouseIcon from '@mui/icons-material/House';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import MessageIcon from '@mui/icons-material/Message';


export const Navigation = () => {
  const [user] = useUserState();

  return (
    <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark" >
      <div className="container">
        <a href="#" className="navbar-brand mb-0 h1"><img className="d-inline-block align-center" src={nysl_logo} alt="" width="40" height="40" ></img>
          NYSL</a>
        <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          className="navbar-toggler"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Si hay un usuario conectado-> accedemos al Menu*/}
            {user && (
              <>
                <li className="nav-item" style={{ margin: '10px' }} >
                  <NavLink
                    to="/"
                    style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white' })}>
                    <HouseIcon style={{ marginRight: '5px' }} /> {/* Icono con un pequeño margen a la derecha */}
                    Home
                  </NavLink>
                </li>
                <li className="nav-item" style={{ margin: '10px' }}>
                  <NavLink
                    to="/schedule"
                    style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white' })}>
                    <SportsSoccerIcon style={{ marginRight: '5px' }} /> {/* Icono con un pequeño margen a la derecha */}
                    Schedule screen
                  </NavLink>
                </li>
                <li className="nav-item" style={{ margin: '10px' }}>
                  <NavLink
                    to="/MessageScreen" style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white' })}>
                    <MessageIcon style={{ marginRight: '5px' }} /> {/* Icono con un pequeño margen a la derecha */}
                    Message screen
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {/* Si no hay un usuario conectado-> Mostramos mensaje*/}
          {!user && (
            <div style={{ color: 'white', marginTop: '10px', marginLeft: '50px', backgroundColor: 'red' }}>
              You must Sign In to access these options !!!!
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
