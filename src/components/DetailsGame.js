
import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { useNavigate } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
// Importa el icono de Material-UI
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// Importa el componente Button de Material-UI
import Button from '@mui/material/Button';

export const DetailsGame = () => {

  //-- Volver a la pagina anterior "Schedule"
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/schedule');
  }

  const goChatScreen = () => {
    const path = generatePath(`/messages/:id`, { id: gameState.date })
    console.log(path);
    navigate(path, { id: gameState.date });
  }



  // utilizamos el useState para guardar los datos de game y  la URL del mapa ya que un UseEffect no puede hacer el returng
  const [gameState, setGameState] = useState(null);
  const [locationState, setLocationState] = useState(null);

  useEffect(() => {

    // Accede al estado almacenado en localStorage
    const gameStateFromLocalStorage = JSON.parse(localStorage.getItem('gameState'));
    const locationStateFromLocalStorage = JSON.parse(localStorage.getItem('locationState'));
    console.log('Games almacenado:', gameStateFromLocalStorage);
    console.log('Locations almacenado:', locationStateFromLocalStorage);

    // Guarda el estado en el estado local del componente
    setGameState(gameStateFromLocalStorage);
    setLocationState(locationStateFromLocalStorage);

  }, []);




  return (
    <>
      <Navigation />
      {gameState && ( // nos hace esto siempre y cuando tengamos gameState
        <div className="card" style={{ marginTop: '19%' }}>
          <div className="card-body">
            <h6 className="card-title">DETAILS GAME INFORMATION</h6>
            <p className="card-text">Date : {gameState.date}</p>
            <p className="card-text">Time : {gameState.time}</p>
            <p className="card-text">Teams : {gameState.teams}</p>
            <p className="card-text">Name : {locationState[gameState.location_key].name}</p>
            <p className="card-text">Address {locationState[gameState.location_key].address}: </p>
            <iframe
              src={locationState[gameState.location_key].map_url}
              width="330"
              height="340"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}


      <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={goBack}
          className="myButtonDetailsGame">
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<WhatsAppIcon />}
          onClick={goChatScreen}
        > Parent's Chat
        </Button>
      </div>
    </>
  );
};



