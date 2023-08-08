
import React, { useState } from 'react';

export const WriteNewMessages = ()=> {
 /* newMessage --> es una variable de estado que almacenará el mensaje que el usuario está escribiendo.
    handleSendMessage --> es una función que se ejecutará cuando el usuario escriba en el campo de entrada.*/

  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };
  

  return (
    <>
    <div className="App">
      <div className="message-list"> {/* mostramos el mensaje escrito por pantalla */}
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="new-message">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
    </>
  );
}

