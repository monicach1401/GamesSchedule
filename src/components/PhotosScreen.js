
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { generatePath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { storage, storageRef } from '../utilites/firebase';
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

import { firebase } from '../utilites/firebase';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from '@mui/material/Button';// Importa el componente Button de Material-UI
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';// Importa el icono de Material-UI



export const PhotosScreen = () => {

  const location = useLocation();
  const idFromPath = location.pathname.split('/').pop();
  const navigate = useNavigate();


  // declaramos todas las variables de estado 
  const [file, setFile] = useState(null); // guardar file seleccionado
  const [buttonPostDisable, setButtonPostDisable] = useState(true); // Habilitar/Deshabilitar botón Post
  const [url, setUrl] = useState();


  // Función para volver atrás
  const goBack = () => {
    const path = generatePath(`/games/:id`, { id: idFromPath });
    navigate(path, { id: idFromPath });
  }



  const handleChange = (e) => {
    let file = e.target.files[0]; // cogemos el nombre del file seleccionado
    if (file) {
      console.log(file);
      setFile(file); // ponemos en la variable file el archivo seleccionado
      setButtonPostDisable(false); // activamos el botón de Upload
    } else {
      setButtonPostDisable(true); // inhabilitamos el botón de Upload
    }

  };

  const UploadFile = () => {
    if (!file) {
      return; // No hay archivo para cargar
    }
    const storageRef = ref(storage, `photos/${idFromPath}/${file.name}`);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!');
        
        // Obtener la URL de descarga directamente después de cargar
        getDownloadURL(storageRef)
          .then((url) => {
            console.log('Download URL:', url);
            
            // Establecer la URL en el estado
            setUrl(url);
          })
          .catch(error => {
            console.log('Error obteniendo la URL de descarga:', error);
          });
        
        setFile(null);
        setButtonPostDisable(true);
      })
      .catch(error => {
        console.log('Error al cargar el archivo:', error);
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
              accept="image/x-png,image/jpeg"
              name="file"
              onChange={(e) => { handleChange(e) }} />
          </div>

        </form>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginLeft: '20px', marginTop: '70px' }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={goBack}
        >
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<FileUploadIcon />}
          disabled={buttonPostDisable}
          onClick={UploadFile}
        > Upload
        </Button>
      </div>
      {/* Mostrar la imagen si la URL está definida */}
      {url && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <img src={url} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}
    </>
  );
}
