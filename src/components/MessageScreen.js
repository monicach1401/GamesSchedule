import React, { useState, useEffect } from 'react';
import ListOfMessages from './ListOfMessages';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';


export const MessageScreen = () => {

  //-- lo utilizaremos para vover a Home
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  }

  // -------------   Obtenemos los datos con fetch del fichero JSON
  const [data, setData] = useState([])
  const showData = async () => {
    const response = await fetch("chat.json")
    const result = await response.json()
    //------ convierto el Json en un array
    const dataConvertToArray = Object.keys(result.messages).map((id) => ({
      id,
      messages: result.messages[id]
    }));
    //--------------
    setData(dataConvertToArray)
    console.log(dataConvertToArray)
  }
  useEffect(() => {
    showData()
  }, [])
  //------------------------------------------------------------------
  return (
    <>
      <Navigation />
      <div className="App">
        <div className="chat">
          {data.map((messageGroup) => ( // estamos utilizando map() para iterar sobre dataConvertToArray y mostrar cada grupo de mensajes. 
            <div key={messageGroup.id}>
              <h2>Nuestro ID- fecha de partido: {messageGroup.id}</h2>
              {Object.values(messageGroup.messages).map((message) => (//Luego, dentro de cada grupo, utilizamos otro map() para mostrar cada mensaje individual con su autor, texto y marca de tiempo.
                <div key={message.timestamp}>
                  <p>Author: {message.author}</p>
                  <p>Text: {message.text}</p>
                  <p>Timestamp: {message.timestamp}</p>
                  <p>-------------------------------</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <button className="Mybutton" onClick={goHome}> Go Home </button>
      </div>
    </>
  );

}
