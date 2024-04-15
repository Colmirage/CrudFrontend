import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios';
import { show_alerta } from '../functions';
import Swal from 'sweetalert2';

const Homepage = () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/'
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);

  const [datos, setDatos] = useState([]);
  const [userid, setUserId] = useState([]);
  const [Id, setId] = useState([]);
  const [title, setTitle] = useState([]);
  const [completed, setCompleted] = useState([]);
  
  const [operation, setOperation] = useState(1);

  useEffect(  () => {
    getDatos()
  }, []);

  //read
  const getDatos = async () => {
    const respuesta = await axios.get(url);
    setDatos(respuesta.data);
  }

  const openModal = (op, id, name, description, completed) => {
    setId('');
    setName('');
    setDescription('');
    setCompleted('');

    setOperation(op);
    if(op === 1){
      setTitle('Registrar Producto')
    }
    else if(op === 2){
      setTitle('Editar producto')
      setId(id);
      setName(name);
      setDescription(description);
      setCompleted(completed);
    }
    window.setTimeout(function(){
      document.getElementById('nombre').focus();
    },500)
  }

  const validar = () => {
    var parametros;
    var metodo;
    if(name.trim() === ''){
      show_alerta('Escribe el nombre del producto','warning')
    }
    else if(description.trim() === ''){
      console.log('Escribe una descripcion','warning')
    }
    else if(completed.trim() === ''){
      console.log('Escribe un precio','warning')
    }
    else{
      if(operation === 1){
        parametros = {name:name.trim(),description: description.trim(), completed: completed}
        metodo= 'POST'
      }
      else{
        parametros = {name:name.trim(),description: description.trim(), completed: completed}
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
          <h1 class="display-4 text-center">Base de Datos</h1>
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
                    <th>TITULO</th>
                    <th>COMPLETADO</th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {datos.map( (data, i)=>(
                    <tr key={data.userId}>
                      <td>{(i+1)}</td>
                      <td>{data.id}</td>
                      <td>{data.title}</td>
                      <td>{data.completed}</td>
                      <td>
                        <button onClick={() => openModal(2,data.userId,data.id,data.title,data.completed)} 
                        className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                          <i className='fa-solid fa-edit'></i>
                        </button>
                        &nbsp;
                        <button onClick={()=> deleteDato(data.userId ,data.id)} className='btn btn-danger'>
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
                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                <input type='text' id="description" className='form-control' placeholder='Descripción' value={description}
                onChange={(e)=> setDescription(e.target.value)}></input>
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
