import Swal from 'sweetalert2';

export function show_alerta(mensaje,icono,foco=''){
    Swal.fire({
        title:mensaje,
        icon:icono
    });
}

function onfocus(foco){
    if(foco !== ''){
        document.getElementById(foco.focus());
    }
}