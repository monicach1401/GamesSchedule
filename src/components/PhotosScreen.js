
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { generatePath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { storage } from '../utilites/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserState, pushData } from '../utilites/firebase';
import { DatabaseList } from '../utilites/firebase';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from '@mui/material/Button';// Importa el componente Button de Material-UI
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';// Importa el icono de Material-UI



export const PhotosScreen = () => {

  const location = useLocation();
  const idFromPath = location.pathname.split('/').pop();
  const navigate = useNavigate();


  //--------- declaramos todas las variables de estado 
  const [file, setFile] = useState(null); // guardar file seleccionado
  const [buttonPostDisable, setButtonPostDisable] = useState(true); // Habilitar/Deshabilitar botón Post
  const [user] = useUserState();



  // ----------------Función para volver atrás
  const goBack = () => {
    const path = generatePath(`/games/:id`, { id: idFromPath });
    navigate(path, { id: idFromPath });
  }


  /*---------- Obtenemos los datos de las photos de RealTime Database ------------  */
  const pathPhotos = location.pathname;
  const pictures = DatabaseList(pathPhotos);
  const snapshots = pictures.map(snapshot => snapshot.val());

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
  /*------------------------------------------------------------------------------- */

  /* Función que se ejecuta al seleccionar un archivo */
  const handleChange = (e) => {
    let file = e.target.files[0]; // cogemos el nombre del file seleccionado
    if (file) {
      setFile(file); // ponemos en la variable file el archivo seleccionado
      setButtonPostDisable(false); // activamos el botón de Upload
    } else {
      setButtonPostDisable(true); // inhabilitamos el botón de Upload
    }

  };
  /*------- Función que formatea el Timestamp------------*/
  const convertTimeStampToString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    //toString convierte un número en una cadena
    //padStart() se utiliza en cadenas y agrega caracteres a la izquierda hasta alcanzar una longitud especificada. 
    //En este caso, padStart(2, '0') indica que la cadena debe tener una longitud mínima de 2 caracteres y si la cadena es más corta, se rellenará con ceros a la izquierda.
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    // return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return `${day}${month}${year}${hours}${minutes}${seconds}`;
  };

  const timeStampConvertedToString = convertTimeStampToString();

  /*----- Función que nos guarda el archivo seleccionado en Storage Firebase y crea un nuevo objecto con  la URL en
  la base de datos de RealTime Database */
  const UploadFile = () => {
    if (!file) {
      return; // No hay archivo para cargar
    }
    const storageRef = ref(storage, `photos/${idFromPath}/${file.name}`);
    // guardamos el file seleccionado en Storage de Firebase
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        // nos guardamos la URL para crear el nuevo objecto en pictures
        getDownloadURL(storageRef)
          .then((url) => {
            // guardamos en RealDatabase
            const pictureObject = {
              author: user.email,
              url: url,
              timestamp: timeStampConvertedToString // lo guardo con la fecha actual y lo mostraré con la fecha formateada
            };
            // Guarda el nuevo objecto en la base de datos, añadiendo uno nuevo
            pushData(`photos/${idFromPath}`, pictureObject);
          })
          .catch(error => {
            console.log('Error obtaining the download URL:', error);
          });
        setFile(null);
        setButtonPostDisable(true);
        alert ('Successfully stored photo !!')
      })
      .catch(error => {
        console.log('Error while uploading the file:', error);
      });
  };


  return (
    <>
      <Navigation />
      <div style={{ marginLeft: '10px', marginTop: '90px' }}>
        <div style={{ backgroundColor: 'lightgray', padding: '2px', borderRadius: '5px', marginRight: '10px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>PHOTOS'S GAME</h1>
        </div>
        <form method="post" enctype="multipart/form-data">
          <div>
            <label htmlFor="file">Choose file to upload</label>
            <input
              type="file"
              id="file"
              accept="image/*"
              name="file"
              onChange={(event) => handleChange(event)} />

          </div>

        </form>
      </div>

      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<FileUploadIcon />}
          disabled={buttonPostDisable}
          onClick={UploadFile}
        > Upload
        </Button>
      </div>
      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        <ul>
          {snapshots.map((snapshot, index) => (
            <li key={index}>
              <div>Author: {snapshot.author}</div>
              <div>Timestamp: {formatTimestamp(snapshot.timestamp)}</div>
              <div>
                <img src={snapshot.url} alt="" style={{ maxWidth: '100%', maxHeight: '300px' }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={goBack}
        >
        </Button>
      </div>
    </>
  );
}
