import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
// Importa el icono de Material-UI
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// Importa el componente Button de Material-UI
import Button from '@mui/material/Button';

export const MessageScreen = () => {

  const navigate = useNavigate();


  //--- función para volver Atrás
  const goBack = () => {
    navigate('/games/:id');
  }

  // utilizamos el useState para guardar los datos de game 
  const [gameState, setGameState] = useState(null);
  const [chatState, setChatState] = useState(null);


  useEffect(() => {
    // obtenemos los datos de game , con getItem del 'gameState'del localStorage
    const gameStateFromLocalStorage = JSON.parse(localStorage.getItem('gameState'));
    console.log('estoy en messagescreen y el Games almacenado:', gameStateFromLocalStorage);
    setGameState(gameStateFromLocalStorage); // Guarda el estado en el estado local del componente

    // obtenemos los datos de messages , con getItem del 'gameState'del localStorage
    const chatDataFromLocalStorage = JSON.parse(localStorage.getItem('chatData'));
    console.log('estoy en messagescreen y message almacenado:', chatDataFromLocalStorage);
    setChatState(chatDataFromLocalStorage); // Guarda el estado en el estado local del componente

  }, []);
  //------------------------------------------------------------


  return (
    <>
      <Navigation />
      <div className="App">
        <div className="chat">
          <div className="chat">
            {/* pongo .filter() para asegurarme de que solo mapeemos los mensajes correspondientes al equipo actual. 
          Luego, he usado .sort() en el mapeo de mensajes para ordenarlos por su timestamp en orden ascendente. */}
            {chatState &&
              chatState
                .filter(messageGroup => gameState.teams === messageGroup.id)
                .map(messageGroup => (
                  <div key={messageGroup.id}>
                    <h5>Messages of Teams: {messageGroup.id}</h5>
                    <p>Date: {gameState.date}</p>
                    {Object.values(messageGroup.messages)
                      .sort((a, b) => a.timestamp - b.timestamp) // Ordenar por timestamp
                      .map(message => (
                        <div key={message.timestamp}>
                          <strong>{message.author}:</strong> {message.text}
                          <p>Timestamp: {message.timestamp}</p>
                          <p>____________________________</p>
                        </div>
                      ))}
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={goBack}
          className="myButtonDetailsGame"> 
        </Button>
      </div>
    </>
  );
}






















