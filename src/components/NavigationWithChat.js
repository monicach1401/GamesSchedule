import React from "react";
import nysl_logo from '../assets/img/nysl_logo.png';
import { NavLink } from 'react-router-dom';
import { useUserState } from '../utilites/firebase';
// importamos los iconos
import HouseIcon from '@mui/icons-material/House';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const NavigationWithChat = () => {

  const [user] = useUserState();
  /* Función para  ir a la pantalla de MessageScreen
  const goChatScreen = () => {
    const path = generatePath(`/messages/:id`, { id: gameState.date })
    console.log(path);
    navigate(path, { id: gameState.date });
  }*/
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
                    Match schedule
                  </NavLink>
                </li>
                <li className="nav-item" style={{ margin: '10px' }}>
                  <NavLink
                    to="/MessageScreen" style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'white' })}>
                    <WhatsAppIcon style={{ marginRight: '5px' }} /> {/* Icono con un pequeño margen a la derecha */}
                    Parents' chat
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {/* Si no hay un usuario conectado-> Mostramos mensaje*/}
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

/*<li className="nav-item" style={{ margin: '10px' }}>
<div
  onClick={goChatScreen} // Agrega el manejador de eventos aquí
  style={{ cursor: 'pointer' }} // Cambia el cursor al pasar por encima
>
  <WhatsAppIcon style={{ marginRight: '5px' }} />
  Parents' chat
</div>
</li>*/