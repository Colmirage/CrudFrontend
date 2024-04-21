import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Municipios from './components/Municipios';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Barrio from './components/Barrio';
import Persona from './components/Persona';
import Vivienda from './components/Vivienda';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage></Homepage>}></Route>
        <Route path='/Municipios' element={<Municipios></Municipios>}></Route>
        <Route path='/Personas' element={<Persona></Persona>}></Route>
        <Route path='/Viviendas' element={<Vivienda></Vivienda>}></Route>
        <Route path='/Barrios' element={<Barrio></Barrio>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
