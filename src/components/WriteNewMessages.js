
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserState, pushData } from '../utilites/firebase';
// importa el icono de enviar
import SendIcon from '@mui/icons-material/Send';
// Importa el componente Button de Material-UI
import IconButton from '@mui/material/Button';

export const WriteNewMessages = () => {

  const location = useLocation();
  // Extrae el valor del parámetro 'id' de la ruta
  const idFromPath = location.pathname.split('/').pop();


  /*--------- creamos nuevo objecto para enviar a la base de datos------------*/
  const [user] = useUserState();
  const [newMessage, setNewMessage] = useState('');// Estado para el nuevo mensaje
  const [buttonSendDisable, setButtonSendDisable] = useState(true); // Cambio aquí



  /*------- Función que formatea el Timestamp------------*/
  const convertTimeStampToString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    //toString convierte un número en una cadena
    //padStart() se utiliza en cadenas y agrega caracteres a la izquierda hasta alcanzar una longitud especificada. 
    //En este caso, padStart(2, '0') indica que la cadena debe tener una longitud mínima de 2 caracteres y si la cadena es más corta, se rellenará con ceros a la izquierda.
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    // return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return `${day}${month}${year}${hours}${minutes}${seconds}`;
  };

  const timeStampConvertedToString = convertTimeStampToString();

  /*------- Función que se ejecuta click de SEND------------*/
  const sendMessage = () => {


    if (newMessage.trim() !== '') {
      // Creamos un nuevo objecto con mensaje que ha escrito el usuario
      const messageObject = {
        author: user.email,
        text: newMessage,
        timestamp: timeStampConvertedToString // lo guardo con la fecha actual y lo mostraré con la fecha formateada
      };
      // Guarda el nuevo objecto en la base de datos, añadiendo uno nuevo
      pushData(`messages/${idFromPath}`, messageObject);

      // Borra el contenido del textarea después de enviar el mensaje
      setNewMessage('');
    }
  };

  return (
    <>

      <div className="chat-container">
        <div className="input-area">
          <textarea
            style={{ height: '50px', width: '300px' }}
            value={newMessage}
            onChange={(e) => {// cada vez que el usuario escribe algo se ejecuta la función de setNewMessage y actualiza el estado del botón
              setNewMessage(e.target.value)
              setButtonSendDisable(e.target.value.trim() === '');
            }}
            placeholder="Escribe tu mensaje..."
          />
          <IconButton
            size="small"
            variant="contained"
            color="warning"
            startIcon={<SendIcon />}
            onClick={sendMessage}
            disabled={ buttonSendDisable}
          > Send
          </IconButton>
        </div>
      </div>


    </>
  );
}



