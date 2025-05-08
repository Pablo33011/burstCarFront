import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertaServicio {

  mostrarError(error: any, titulo: string = 'Error') {
    let mensaje = 'Ha ocurrido un error inesperado.';

    if (error?.error?.message) {
      mensaje = error.error.message;
    } else if (error?.message) {
      mensaje = error.message;
    }

    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
      confirmButtonText: 'Aceptar'
    });
  }

  mostrarMensaje(titulo: string, mensaje: string) {
    Swal.fire({
      icon: 'info',
      title: titulo,
      text: mensaje,
      confirmButtonText: 'Aceptar'
    });
  }

  mostrarExito(mensaje: string, titulo: string = 'Éxito') {
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje,
      confirmButtonText: 'Aceptar'
    });
  }
}
