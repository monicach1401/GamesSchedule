import React from "react";
import player from '../assets/img/player.jpg';



export const PlayerCard = ()=> {
    return(
      <div className="card " >
        <img src={player} className="card-img-top" alt="..."></img>
        <div className="card-body">
          <h1 className="card-text">FICHA TÉCNICA DEL JUGADOR</h1>
        </div>
        <ul>
          <li>Nombre</li>
          <li>Apellidos</li>
          <li>Equipo</li>
          <li>Entrenador</li>
        </ul>
      </div>

    )
}