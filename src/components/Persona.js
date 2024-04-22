import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios';
import { show_alerta } from '../functions';
import Swal from 'sweetalert2';
import Navbar from './Navbar';

const Persona = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const url = apiUrl + 'personas/';
  const [actividad, setActividad] = useState(0);

  const [datos, setDatos] = useState([]);

  const [id, setId] = useState([]);
  const [nombre, setNombre] = useState([]);
  const [telefono, setTelefono] = useState([]);
  const [edad, setEdad] = useState([]);
  const [genero, setGenero] = useState([]);
  const [cabezaId, setCabezaId] = useState([]);
  const [municipioId, setMunicipioId] = useState([]);

  const [title, setTitle] = useState([]);
  const [operation, setOperation] = useState(1);

  //read
  const getDatos = async () => {
    const respuesta = await axios.get(url);
    setDatos(respuesta.data);
  }

  useEffect(  () => {
    getDatos()
  }, [actividad]);

  const openModal = (op, id, nombre, telefono, edad, genero, cabezaId, municipioId) => {
    setId('');
    setNombre('');
    setTelefono('');
    setEdad('');
    setGenero('');
    setCabezaId('');
    setMunicipioId('');

    setOperation(op);
    if(op === 1){
      setTitle('Registrar Persona')
    }
    else if(op === 2){
      setTitle('Editar Persona')
      setId(id);
      setNombre(nombre);
      setTelefono(telefono);
      setEdad(edad);
      setGenero(genero);
      setCabezaId(cabezaId);
      setMunicipioId(municipioId);
    }
    window.setTimeout(function(){
      document.getElementById('nombre').focus();
    },500)
  }

  const validar = () => {
    var parametros;
    var metodo;
    var urlid;
    if(nombre.trim() === ''){
      show_alerta('Escribe el nombre de la persona','warning')
    }
    else if(telefono === ''){
      show_alerta('Escribe un teléfono','warning')
    }
    else if(telefono.length !== 10){
      show_alerta('El teléfono debe tener 10 de longitud','warning')
    }
    else if(edad === ''){
      show_alerta('Escribe una edad','warning')
    }
    else if(edad < 0){
      show_alerta('La edad no puede ser negativa','warning')
    }
    else if(genero.trim() === ''){
      show_alerta('Escribe el género','warning')
    }
    else if(genero !== 'Masculino' && genero !== 'masculino' && genero !== 'femenino' && genero !== 'Femenino'){
      show_alerta('Escribe un género válido','warning')
    }
    else if(municipioId === ''){
      show_alerta('Escribe el Id de un Municipio','warning')
    }
    else{
      if(operation === 1){
        parametros = {nombre_persona:nombre.trim(),telefono:parseInt(telefono),edad:parseInt(edad),
        genero:genero.trim(),cabezaId:parseInt(cabezaId),municipioId:parseInt(municipioId)}
        metodo= 'POST'

        console.log(parametros)
        enviarSolicitud(metodo, parametros)
      }
      else{

        parametros = {id:id,nombre_persona:nombre.trim(),telefono:parseInt(telefono),edad:parseInt(edad),
          genero:genero.trim(),cabezaId:parseInt(cabezaId),municipioId:parseInt(municipioId)}
        metodo= 'PUT'
        urlid = url+id

        console.log(url,parametros,urlid)
        enviarSolicitudId(metodo, parametros, urlid)
      }
      
      
    }
  }

  const enviarSolicitud = async(metodo, parametros) => {
    await axios({ method:metodo, url:url, data:parametros}).then(function(respuesta){
      var tipo = respuesta.data[0];
      var msj = respuesta.data[1];
      show_alerta(msj,tipo)
      if(tipo === 'success'){
        document.getElementById('btnCerrar').click();
        getDatos();
        
      } 
    })
    .catch(function(error){
      show_alerta('Error en la solicitud', 'error')
      console.log(error)
    })
    setActividad(actividad + 1);
  }

  const enviarSolicitudId = async(metodo, parametros, urlid) => {
    await axios({ method:metodo, url:urlid, data:parametros}).then(function(respuesta){
      var tipo = respuesta.data[0];
      var msj = respuesta.data[1];
      show_alerta(msj,tipo)
      if(tipo === 'success'){
        document.getElementById('btnCerrar').click();
        getDatos();
        
      } 
    })
    .catch(function(error){
      show_alerta('Error en la solicitud', 'error')
      console.log(error)
    })
    setActividad(actividad + 1);
  }

  const deleteDato = (id, nombre) => {
    var parametros;
    var metodo;
    var urlid;
    Swal.fire({
      title:'¿Seguro de querer eliminar el dato '+nombre+' ?',
      icon: 'question', text:'No se podrá deshacer',
      showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        setId(id);
        urlid = url+id;
        console.log(urlid, id, url)
        parametros = {id:id}
        metodo= 'DELETE'
        enviarSolicitudId(metodo,parametros,urlid);
      }
      else{
        show_alerta('El dato NO fue eliminado','info');
      }
    })
  }

  return (
    <div className='App'>
      <div>
        <Navbar/>
      </div>
      <div className="container ">
        <div className='row mt-3 d-flex justify-content-center align-items-center'>
          <h1 className="display-4 text-center">Datos de las Personas</h1>
        </div>
      </div>

      <div className='container-fluid'>
        <div className='row mt-3 d-flex justify-content-center align-items-center'>
            <div className='col-md-4 offset-md-04'>
              <div className='d-grid mx-auto'>
                <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                  <i className='fa-solid fa-circle-plus'></i> añadir
                </button>
              </div>
            </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className='table-responsive'>
              <table className='table table-borderes'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>iD</th>
                    <th>NOMBRE</th>
                    <th>TELÉFONO</th>
                    <th>EDAD</th>
                    <th>GÉNERO</th>
                    <th>ID CDF</th>
                    <th>ID MUNICIPIO</th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {datos.map( (data, i)=>(
                    <tr key={data.id}>
                      <td>{(i+1)}</td>
                      <td>{data.id}</td>
                      <td>{data.nombre_persona}</td>
                      <td>{data.telefono}</td>
                      <td>{data.edad}</td>
                      <td>{data.genero}</td>
                      <td>{data.cabezaId}</td>
                      <td>{data.municipioId}</td>
                      <td>
                        <button onClick={() => openModal(2,data.id,data.nombre_persona,data.telefono,
                        data.edad, data.genero, data.cabezaId, data.municipioId)} 
                        className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                          <i className='fa-solid fa-edit'></i>
                        </button>
                        &nbsp;
                        <button onClick={()=> deleteDato(data.id ,data.nombre_persona)} className='btn btn-danger'>
                          <i className='fa-solid fa-trash'></i>
                        </button>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div id='modalProducts' className='modal fade' aria-hidden='true'>
        <div className="modal-dialog">
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
            </div>
            <div className='modal-body'>
              <input type='hidden' id='id'></input>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-person-rays'></i></span>
                <input type='text' id="nombre" className='form-control' placeholder='Nombre' value={nombre}
                onChange={(e)=> setNombre(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-city'></i></span>
                <input type='number' id="telefono" className='form-control' placeholder='Teléfono' value={telefono}
                onChange={(e)=> setTelefono(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-money-bill'></i></span>
                <input type='number' id="edad" className='form-control' placeholder='Edad' value={edad}
                onChange={(e)=> setEdad(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-person-rays'></i></span>
                <input type='text' id="genero" className='form-control' placeholder='Género' value={genero}
                onChange={(e)=> setGenero(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-money-bill'></i></span>
                <input type='number' id="cabezaId" className='form-control' placeholder='Id Cabeza de Familia' value={cabezaId === null ? '' : cabezaId}
                onChange={(e)=> setCabezaId(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-money-bill'></i></span>
                <input type='number' id="municipioId" className='form-control' placeholder='Id del Municipio' value={municipioId}
                onChange={(e)=> setMunicipioId(e.target.value)}></input>
              </div>
              <div className='d-grid col-6 mx-auto'>
                  <button onClick={() => validar()} className='btn btn-success'>
                    <i className='fa-solid fa-floppy-disk'></i>
                    Guardar
                  </button>
              </div>
            </div>
            <div className='modal-footer'>
                  <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Persona;