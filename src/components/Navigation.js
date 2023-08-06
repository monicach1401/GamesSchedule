import React from "react";
import nysl_logo from '../assets/img/nysl_logo.png';
import { NavLink, useLocation } from 'react-router-dom';
import { useUserState } from '../utilites/firebase';
// importamos los iconos
import HouseIcon from '@mui/icons-material/House';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';



export const Navigation = () => {

  const [user] = useUserState();

  /* con location puedo saber donde estoy en todo momento */
  const location = useLocation();
  console.log('ahora mi location es:', location)
  /* en la variable pathname, sé en todo momento cual es mi ruta */
  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  return (
    <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark" >
      <div className="container">
        <a href="#" className="navbar-brand mb-0 h1">
          <img className="d-inline-block align-center" src={nysl_logo} alt="" width="40" height="40" />
          NYSL
        </a>
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
            {user && (
              <>
                <li className="nav-item" style={{ margin: '10px' }}>
                  <NavLink
                    to="/"
                    style={({ isActive }) => ({ color: isActiveRoute('/') ? 'greenyellow' : 'white' })}
                  >
                    <HouseIcon style={{ marginRight: '5px' }} />
                    Home
                  </NavLink>
                </li>
                <li className="nav-item" style={{ margin: '10px' }}>
                  <NavLink
                    to="/schedule"
                    style={({ isActive }) => ({ color: isActiveRoute('/schedule') ? 'greenyellow' : 'white' })}
                  >
                    <SportsSoccerIcon style={{ marginRight: '5px' }} />
                    Match schedule
                  </NavLink>
                </li>
                {/* Condición para mostrar el enlace solo si estamos en /games, como mi path es'/games/2023_09_01_01'. utilizo el includes */}
                {location.pathname.includes('/games') && (  
                  <li className="nav-item" style={{ margin: '10px' }}>
                    <NavLink
                      to="/messages/:id"
                      style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white' })}
                    >
                      <WhatsAppIcon style={{ marginRight: '5px' }} />
                      Parents' chat
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>
          {!user && (
            <div style={{ color: 'white', marginTop: '10px', marginLeft: '50px', backgroundColor: 'red', fontSize: 'x-large' }}>
              You must Sign In to access !!!!
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};