
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { DatabaseValue } from '../utilites/firebase';

import { useLocation } from 'react-router-dom';
import { WriteNewMessages } from '../components/WriteNewMessages';


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
  // a través de location obtenemos el id
  const location = useLocation();
  // Extrae el valor del parámetro 'id' de la ruta
  const idFromPath = location.pathname.split('/').pop();
  console.log(' estoy en messagescreen y mi location es :', location)
  console.log('Estoy en messagescreen y mi id es:', idFromPath)

  /*---obtenemos los datos de la base de datos de FIREBASE del chat.json ---------------------*/
  const dataMessages = DatabaseValue('/'); // poniendo '/' me coge toda la base de datos
  if (dataMessages === null) {
    return <h1>Loading the messages ...</h1>;
  }

  console.log('dataMessages es :', dataMessages)

  /*if (!dataMessages.messages[idFromPath]) {
    return <h1>No messages found for {idFromPath}</h1>;
  }*/


  const messagesData  = dataMessages.messages[idFromPath];

  return (
    <>
      <Navigation />
      <div style={{ marginLeft: '20px', marginTop: '90px' }}>
        <h3>Messages for id: {idFromPath}</h3>
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





















