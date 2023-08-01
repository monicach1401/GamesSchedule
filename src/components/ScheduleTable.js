import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import { useNavigate } from 'react-router-dom';
import { generatePath } from 'react-router-dom';

export const ScheduleTable = () => {

  //-- lo utilizaremos para vover a la página anterior
  const navigate = useNavigate();
  const goBack = () => navigate('/');
 


  // -------------   Obtenemos los datos con fetch del fichero JSON
  const [data, setData] = useState([])
  const showData = async () => {
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
  }

  useEffect(() => {
    showData()
  }, [])
  //------------------------------------------------------------------

  //console.log('esto es la data',data)
  //const loc=data[1].games.location_key
  //console.log(loc)
  //console.log('su url es',data[1].locations[loc].map_url)

  //-- lo utilizaremos para cuando hagamos click en una Fila
  const goDetailsGame = (row) => {
    console.log('Fila seleccionada:', row);
     // Genera la ruta con el parámetro row.id
     const path = generatePath(`/games/:id`, { id: row.id });
     // Guarda el estado en localStorage
     localStorage.setItem('gameState', JSON.stringify(row.games));
     // Redirige a la página DetailsGame
     window.location.href = path;
  };

  //3- configuramos columnas
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
    //{
    //name: 'LOCATION',
    // cell: row => (
    //  <Link to={`/games/${row.id}`} state={{ game: row.games }}>
    //    {row.games.location_key}
    //  </Link>
    // ),

  ]

  // PATHNAME: especifica la ubicación a la que se navegará cuando se haga clic en el enlace.
  // tenemos que ir a "/games/:id" por lo tanto tenemos que construir asi la URL
  // la variable row.id corresponde al id del objeto en la fila de la tabla.
  // si row.id es "2023_09_01_01", la URL sería "/games/2023_09_01_01".*/}
  // STATE: Se utiliza para pasar datos adicionales al componente de destino.
  // Aqui tenemos que pasar los datos del juego (row.games) .
  // state permite que el componente de destino acceda a los datos enviados desde el componente de origen.
  // En el componente destino para acceder a estos datos , tendremos que utilizar useLocation

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
        onRowClicked={goDetailsGame}
      />
      <button onClick={goBack}>Go Back</button>
    </>
  )
}









