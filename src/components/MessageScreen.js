import React from 'react';
import { Navigation } from './Navigation';

export const MessageScreen = () => {
  return (
    <>
      <Navigation />
      <div className="message-container">
        <textarea className="MytextArea" id="story" name="story" rows="2" cols="60">
          Type a message
        </textarea>
        <button className="MybuttonSend">Enviar</button>
      </div>
    </>
  );
}
