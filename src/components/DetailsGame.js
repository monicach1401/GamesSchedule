
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';

export const DetailsGame = () => {
  const id = useParams();
  console.log('el id es:', id)
  const location = useLocation();
  console.log(location)
  const game = location.state?.game;
  console.log(game)

  if (!game) {
    return (
      <h1>Error</h1>
    );
  }
  const map_url = "https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d47514.42588168431!2d-87.6702499!3d41.9003489!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x880fd34e07f6bac3%3A0x68a82e5d59952c86!2s24%20W%20Walton%20St%2C%20Chicago%2C%20IL%2060610!3m2!1d41.9002924!2d-87.6290504!5e0!3m2!1ses!2ses!4v1690875687069!5m2!1ses!2ses"
  return (
    <>
      <Navigation/>
      
      <div className="card " style={{marginTop:'19%'}}>
        <div className="card-body">
          <h5 className="card-title">DETAILS GAME INFORMATION</h5>
          <p className="card-text">Date :  {game.date}</p>
          <p className="card-text">Time : {game.time}</p>
          <p className="card-text">Teams : {game.teams}</p>
          <iframe
            src={map_url}
            width="350"
            height="300"
            style={{ border: '0' }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </>
  )
};


