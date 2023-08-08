import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Navigation } from './Navigation';
import { useNavigate } from 'react-router-dom';
import { generatePath } from 'react-router-dom';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';// Importa el icono de Material-UI
import Button from '@mui/material/Button'; // Importa el componente Button de Material-UI

export const ScheduleTable = () => {

  //-- lo utilizaremos para vover a la página anterior
  const navigate = useNavigate();
  const goBack = () => navigate('/');

  //------------- función que nos guarda los datos de la fila para pasarlos al componente DetailsGame
  const goDetailsGame = (row) => {
    console.log('Fila seleccionada:', row);

    // Genera la ruta con el parámetro row.id para mostrar justo los datos de ese id 
    const path = generatePath(`/games/:id`, { id: row.id });

    // Extrae el valor del parámetro 'id' de la ruta para despues utilizarlo en el componente MessageScrenn


    const idFromPath = path.split('/').pop();
    console.log('mi id for messagescreen es:', path)

    // Guarda el estado en localStorage
    localStorage.setItem('gameState', JSON.stringify(row.games));// Guarda los datos de games
    localStorage.setItem('locationState', JSON.stringify(row.locations)); // Guarda los datos de locations

    // Redirige a la página DetailsGame
    window.location.href = path;
  };


  // -------------   Obtenemos los datos con fetch del fichero GAMES.JSON
  const [data, setData] = useState([])
  const showData = async () => {
    try {
      const response = await fetch("games.json")
      const result = await response.json()
      //------ convierto el Json en un array
      const dataConvertToArray = Object.keys(result.games).map((id) => ({
        id,
        games: result.games[id],
        locations: result.locations,
      }));
      //--------------
      setData(dataConvertToArray)
      console.log(dataConvertToArray)
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };

  useEffect(() => {
    showData()
  }, [])

  //-----------------3- configuramos columnas
  const columns = [
    {
      name: 'DATE',
      selector: row => row.games.date
    },
    {
      name: 'TIME',
      selector: row => row.games.time

    },
    {
      name: 'TEAMS',
      selector: row => row.games.teams
    },
    {
      name: 'LOCATION',
      selector: row => row.games.location_key
    },

  ]
  //------------------------------------------------------------------
  //4- mostramos la data en DataTable
  return (
    <>
      <Navigation />
      <h1 style={{ marginTop: '15%' }}> </h1>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        onRowClicked={goDetailsGame} // al hacer click en una fila mostramos DetailsGame
      />
      <Button
        variant="contained"
        color="success"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={goBack}>
      </Button>
    </>
  )
}

