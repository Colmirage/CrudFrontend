import React from 'react';
import Navbar from './Navbar';


const Homepage = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
          <div className='row mt-3 d-flex justify-content-center align-items-center'>
            <h1 className="display-3 text-center">Bienvenido al CRUD</h1>
            
            <h1 className="display-5 text-left">Realizado por:</h1>
            <p className='lead text-left'>Sebastian Molina Gonzalez</p>
            <p className='lead text-left'>Javier Esteban Pacavita Galindo</p>
            <p className='lead text-left'>Samuel Gonzalez Nisperuza</p>

            <h1 className="display-5 text-left">Profesor:</h1>
            <p className='lead text-left'>Hernando Rodriguez Gonzalez</p>
            
            <img style={{ maxWidth: '800px', maxHeight: '800px' }} src='/crud.jpg' alt='foto de municipio'/>
            
          </div>
        </div>
    </div>

    
  );
};

export default Homepage;
