import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from './components/Home';
import {ScheduleTable} from './components/ScheduleTable';



function App() {
  return (
    <div className="App">
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/schedule" element={ <ScheduleTable /> } />
        </Routes>
      </BrowserRouter>
      </>
    </div>
  );
}
 
export default App;
