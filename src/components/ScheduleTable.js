import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

export const ScheduleTable = () => {

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
  //console.log(data)
  //const location_key=data[0].games.location_key
  //console.log ('el location key es',data[0].games.location_key)
  //const location_name=data[0].locations[location_key].name
  //console.log('nombre del campo : ', location_name)
  

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
      cell: row => (
        <Link to={`/games/${row.id}`} state={{ game: row.games }}>
          {row.games.location_key}
        </Link>
      ),
    },
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
      <Navigation/>
      <h1 style={{marginTop:'19%'}}> </h1>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
      />
    </>
  )
}









