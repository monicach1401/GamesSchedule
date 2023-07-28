import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import DataTable from 'react-data-table-component';
import 'styled-components'





//4- mostrar datos en datatable


export const ScheduleTable = () => {
  //1.configurar hooks
  const [games, setGames] = useState([])
  //2.función para mostrar datos con fetch
  const file = "games.json"
  const showData = async () => {
    const response = await fetch(file)
    const data = await response.json()

    const resultArray = Object.keys(data.games).map((id) => ({
      id,
      games: data.games[id],
      locations: data.locations,
    }));

    setGames(resultArray)
  
  }
  useEffect(() => {
    showData()
  }, [])




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
    }
  ]

  //4- mostramos la data en DataTable
  return (
    <>
      <Navigation />
      <h1> Estoy en la pantalla de Horarios</h1>
      <DataTable
        columns={columns}
        data={games}
        pagination
      />

    </>
  )
}









