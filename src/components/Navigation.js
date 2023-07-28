import React from "react";
import nysl_logo from '../assets/img/nysl_logo.png';
import { NavLink } from 'react-router-dom';


export const Navigation = ()=> {
  return(
    <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark" >
      <div className="container">
      <a  href="#" className="navbar-brand mb-0 h1"><img className="d-inline-block align-center" src={nysl_logo} alt="" width="40" height="40" ></img>
       NYSL</a>
  
      <button 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        className="navbar-toggler" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
   
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item" style={{ margin: '10px' }}>
              <NavLink to="/" style={({ isActive }) => ({ 
                color: isActive ? 'greenyellow' : 'white' })}>Home</NavLink>
          </li>
          <li className="nav-item" style={{ margin: '10px' }}>
              <NavLink to="/schedule" style={({ isActive }) => ({ 
                color: isActive ? 'greenyellow' : 'white' })}>Schedule screen</NavLink>
          </li>
        </ul>
      </div>
    </div>    
  </nav>



  )
}