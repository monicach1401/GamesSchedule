
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { generatePath } from 'react-router-dom';
import { DatabaseValue } from '../utilites/firebase';
import { DatabaseList } from '../utilites/firebase';
import { useLocation } from 'react-router-dom';
import { WriteNewMessages } from '../components/WriteNewMessages';


// Importa el icono de Material-UI
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// Importa el componente Button de Material-UI
import Button from '@mui/material/Button';



export const MessageScreen = () => {

  const location = useLocation();
  const idFromPath = location.pathname.split('/').pop();
  const navigate = useNavigate();

  // Función para volver atrás
  const goBack = () => {
    const path = generatePath(`/games/:id`, { id: idFromPath });
    navigate(path, { id: idFromPath });
  }

  /* ----- Utilizamos el localStorage para extraer los datos de game que hemos seleccionado---------------------------*/
  
  const messageStateFromLocalStorage = JSON.parse(localStorage.getItem('snapshots'));
  console.log('snaphot almacenado:', messageStateFromLocalStorage);

  console.log(' los mensajes del store son  :',messageStateFromLocalStorage)
  console.log('el idfrompath es:',idFromPath)
  const messagesData  = messageStateFromLocalStorage[idFromPath];
  console.log('los mensajes de este id son:',messagesData)

  return (
    <>
      <Navigation />
      <div style={{ marginLeft: '20px', marginTop: '90px' }}>
        <h3>MessagesList, el id a buscar es: {idFromPath}</h3>
        <ul>
          {Object.keys(messagesData).map((messageKey, index) => (
            <li key={index}>
              <p>Author: {messagesData[messageKey].author}</p>
              <p>Text: {messagesData[messageKey].text}</p>
              <p>Timestamp: {messagesData[messageKey].timestamp}</p>
            </li>
          ))}
          </ul>
      </div>
      <div style={{ marginLeft: '20px', marginTop: '90px' }}>
        <WriteNewMessages />
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
