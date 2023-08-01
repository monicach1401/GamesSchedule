
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { useNavigate } from 'react-router-dom';

export const DetailsGame = ({ history }) => {
  //-- lo utilizaremos para vover a la página anterior
  const navigate = useNavigate();
  const goBack = () => navigate('/schedule');

  // me creo una variables con las localizaciones para obtener la URL
  const locationsData = {
    "Katzenmaier": {
      "name": "AJ Katzenmaier Elementary",
      "address": "24 W. Walton St., Chicago, IL 60610",
      "map_url": "https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d47514.42588168431!2d-87.6702499!3d41.9003489!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x880fd34e07f6bac3%3A0x68a82e5d59952c86!2s24%20W%20Walton%20St%2C%20Chicago%2C%20IL%2060610!3m2!1d41.9002924!2d-87.6290504!5e0!3m2!1ses!2ses!4v1690875996738!5m2!1ses!2ses"
    },
    "Greenbay": {
      "name": "Greenbay Elementary",
      "address": "1734 N. Orleans St., Chicago, IL 60614",
      "map_url": "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d47504.37207629903!2d-87.6790387523189!3d41.91385880867901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x880fd34073f306a3%3A0x9e1726bbf8f23f0e!2s1734%20N%20Orleans%20St%2C%20Chicago%2C%20IL%2060614%2C%20EE.%20UU.!3m2!1d41.9138023!2d-87.6378393!5e0!3m2!1ses!2ses!4v1690876060462!5m2!1ses!2ses"
    },
    "Howard": {
      "name": "Howard A Yeager Elementary",
      "address": "2245 N. Southport Ave., Chicago, IL 60614",
      "map_url": "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d2968.5906062915315!2d-87.66570362347797!3d41.923158762591015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x880fd2e37f9b8d2d%3A0x62ad8b907dd755d6!2s2245%20N%20Southport%20Ave%2C%20Chicago%2C%20IL%2060614%2C%20EE.%20UU.!3m2!1d41.9231548!2d-87.6631287!5e0!3m2!1ses!2ses!4v1690876141178!5m2!1ses!2ses"
    },
    "Marjorie": {
      "name": "Marjorie P Hart Elementary",
      "address": "2625 N. Orchard St., Chicago, IL 60614",
      "map_url": "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d47492.62856010919!2d-87.68709705216011!3d41.92963479245168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x880fd30f2630e551%3A0x3e719e44a5cef714!2s2625%20N%20Orchard%20St%2C%20Chicago%2C%20IL%2060614%2C%20EE.%20UU.!3m2!1d41.929578299999996!2d-87.6458976!5e0!3m2!1ses!2ses!4v1690876213037!5m2!1ses!2ses"
    },
    "North": {
      "name": "North Elementary",
      "address": "1409 N. Ogden Ave., Chicago, IL 60610",
      "map_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.355893382735!2d-87.6480479234786!3d41.90670746362178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd33a674ca85d%3A0x9940c7163c4950c5!2s1409%20N%20Ogden%20Ave%2C%20Chicago%2C%20IL%2060610%2C%20EE.%20UU.!5e0!3m2!1ses!2ses!4v1690891879236!5m2!1ses!2ses"
    },
    "South": {
      "name": "South Elementary",
      "address": "2101 N. Fremont St., Chicago, IL 60614",
      "map_url": "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2968.6090036643554!2d-87.64824367359245!3d41.92276333784808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s2101%20N.%20Fremont%20St.%2C%20Chicago%2C%20IL%20606140!5e0!3m2!1ses!2ses!4v1690891953594!5m2!1ses!2ses"
    }
  };

  // el Params obtenemos el id
  const id = useParams();
  console.log('el id es:', id)

  // con location obtenemos los datos que nos pasan del componente ScheduleTable
  const location = useLocation();
  console.log('en location es ', location)

  // Ponemos los valores del state.game en nuestra variable
  const detailsGame = location.state?.game;

  console.log(' el location key es', detailsGame.location_key)

  console.log(locationsData[detailsGame.location_key].map_url)
  // tenemos que convertir este valor en un string para que lo podamos guardar en esta variable
  const map_url = locationsData[detailsGame.location_key].map_url.toString();

  // controlamos errores
  if (!detailsGame) {
    return (
      <h1>Error</h1>
    );
  }

  return (
    <>
      <Navigation />
      <div className="card " style={{ marginTop: '19%' }}>
        <div className="card-body">
          <h6 className="card-title">DETAILS GAME INFORMATION</h6>
          <p className="card-text">Date :  {detailsGame.date}</p>
          <p className="card-text">Time : {detailsGame.time}</p>
          <p className="card-text">Teams : {detailsGame.teams}</p>
          <p className="card-text">Name : {locationsData[detailsGame.location_key].name}</p>
          <p className="card-text">Adress : {locationsData[detailsGame.location_key].address}</p>
          <iframe
            src={map_url}
            width="330"
            height="340"
            style={{ border: '0' }}
            allowFullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
      <button onClick={goBack}>Go Back</button>
    </>
  )
};


