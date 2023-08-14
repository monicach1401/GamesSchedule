
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { generatePath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { DatabaseList } from '../utilites/firebase';
import { WriteNewMessages } from '../components/WriteNewMessages';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';// Importa el icono de Material-UI
import Button from '@mui/material/Button';// Importa el componente Button de Material-UI




export const MessageScreen = () => {

  const location = useLocation();
  const idFromPath = location.pathname.split('/').pop();
  const navigate = useNavigate();

  // Función para volver atrás
  const goBack = () => {
    const path = generatePath(`/games/:id`, { id: idFromPath });
    navigate(path, { id: idFromPath });
  }

  // -------------   Obtenemos los datos DataList de la basae de datos de Firebase
  const pathMessages = location.pathname; // buscamos solo los datos del id que encontramos en el path,/messages/2023_09_01_01
  const data = DatabaseList(pathMessages);
  const snapshots = data.map(snapshot => snapshot.val());

  //los ordeno primero por año, despues por mes, despues por dia y despues por hora
  const sortedSnapshots = Object.keys(snapshots)
    .map(index => snapshots[index])
    .sort((a, b) => {
      const dateA = new Date(a.timestamp.substring(4, 8), a.timestamp.substring(2, 4) - 1, a.timestamp.substring(0, 2), a.timestamp.substring(8, 10), a.timestamp.substring(10, 12), a.timestamp.substring(12, 14));
      const dateB = new Date(b.timestamp.substring(4, 8), b.timestamp.substring(2, 4) - 1, b.timestamp.substring(0, 2), b.timestamp.substring(8, 10), b.timestamp.substring(10, 12), b.timestamp.substring(12, 14));
      return dateA - dateB;
    }
    );

  // Formateo el timestamp para mostrarlo por pantalla
  const formatTimestamp = (timestamp) => {
    const year = timestamp.substring(4, 8);
    const month = timestamp.substring(2, 4);
    const day = timestamp.substring(0, 2);
    const hours = timestamp.substring(8, 10);
    const minutes = timestamp.substring(10, 12);
    const seconds = timestamp.substring(12, 14);
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <Navigation />
      <div style={{ marginLeft: '10px', marginTop: '90px' }}>
        <div style={{ backgroundColor: 'lightgray', padding: '2px', borderRadius: '5px', marginRight: '10px',textAlign: 'center' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>PARENT'S CHAT</h1>
        </div>
        <div>
          {/* muestro los mensajes que pertenecen el id en concreto */}
          <ul>
            {sortedSnapshots.map((snapshot, index) => (
              <li key={index}>
                <p>Author: {snapshot.author}</p>
                <p>Text: {snapshot.text}</p>
                <p>Timestamp: {formatTimestamp(snapshot.timestamp)}</p>
              </li>
            ))}
          </ul>
        </div>
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
