import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios';
import { show_alerta } from '../functions';
import Swal from 'sweetalert2';

const Homepage = () => {
  const url = 'https://tallercrudis2-backend.onrender.com/api/v1/universal/municipios'
  const [datos, setDatos] = useState([]);

  const [id, setId] = useState([]);
  const [name, setName] = useState([]);
  const [area, setArea] = useState([]);
  const [presupuesto, setPresupuesto] = useState([]);

  const [title, setTitle] = useState([]);
  const [operation, setOperation] = useState(1);

  useEffect(  () => {
    getDatos()
  }, []);

  //read
  const getDatos = async () => {
    const respuesta = await axios.get(url);
    console.log(respuesta)
    setDatos(respuesta.data);
  }

  const openModal = (op, id, name, area, presupuesto) => {
    setId('');
    setName('');
    setArea('');
    setPresupuesto('');

    setOperation(op);
    if(op === 1){
      setTitle('Registrar Municipio')
    }
    else if(op === 2){
      setTitle('Editar Municipio')
      setId(id);
      setName(name);
      setArea(area);
      setPresupuesto(presupuesto);
    }
    window.setTimeout(function(){
      document.getElementById('nombre').focus();
    },500)
  }

  const validar = () => {
    var parametros;
    var metodo;
    if(name.trim() === ''){
      show_alerta('Escribe el nombre del municipio','warning')
    }
    else if(area.trim() === ''){
      console.log('Escribe una área','warning')
    }
    else if(presupuesto.trim() === ''){
      console.log('Escribe un presupuesto','warning')
    }
    else{
      if(operation === 1){
        parametros = {name:name.trim(),area: area.trim(), presupuesto: presupuesto}
        metodo= 'POST'
      }
      else{
        parametros = {name:name.trim(),area: area.trim(), presupuesto: presupuesto}
        metodo= 'PUT'
      }
      enviarSolicitud(metodo, parametros)
    }
  }

  const enviarSolicitud = async(metodo, parametros) => {
    await axios({ method:metodo, url:url, data:parametros}).then(function(respuesta){
      var tipo = respuesta.data[0];
      var msj = respuesta.data[1];
      console.log(msj,tipo)
      if(tipo === 'success'){
        document.getElementById('btnCerrar').click();
        getDatos();
      } 
    })
    .catch(function(error){
      console.log('Error en la solicitud', error)
    })
  }

  const deleteDato = (id, name) => {
    Swal.fire({
      title:'Seguro de querer eliminar el dato '+name+' ?',
      icon: 'question', text:'No se podra deshacer',
      showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        setId(id);
        enviarSolicitud('DELETE',{id:id});
      }
      else{
        show_alerta('El dato NO fue eliminado','info');
      }
    })
  }

  return (
    <div className='App'>
      <div className="container ">
        <div className='row mt-3 d-flex justify-content-center align-items-center'>
          <h1 className="display-4 text-center">Base de Datos Municipio</h1>
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
                    <th>ÁREA</th>
                    <th>PRESUPUESTO</th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {datos.map( (data, i)=>(
                    <tr key={data.id}>
                      <td>{(i+1)}</td>
                      <td>{data.id}</td>
                      <td>{data.nombre}</td>
                      <td>{data.area}</td>
                      <td>
                        <button onClick={() => openModal(2,data.id,data.nombre,data.area,data.presupuesto)} 
                        className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                          <i className='fa-solid fa-edit'></i>
                        </button>
                        &nbsp;
                        <button onClick={()=> deleteDato(data.id ,data.nombre)} className='btn btn-danger'>
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
                <input type='text' id="nombre" className='form-control' placeholder='Nombre' value={name}
                onChange={(e)=> setName(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-city'></i></span>
                <input type='text' id="area" className='form-control' placeholder='Área' value={area}
                onChange={(e)=> setArea(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-money-bill'></i></span>
                <input type='number' id="presupuesto" className='form-control' placeholder='Presupuesto' value={presupuesto}
                onChange={(e)=> setPresupuesto(e.target.value)}></input>
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

export default Homepage;