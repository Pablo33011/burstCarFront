export const environment = {
  production: false,
  mapboxAccessToken: ''/*Debe registrase en mabox  y agregar el token*/,
  firebaseConfig: {
    /*Debe registrase en firebase realtime database  y agregar la configuración*/   
  }
};
/*
export const endpointEnviroment = {
  loginPrestador: 'http://192.168.1.61:8889/prestador/sesion',
  loginSolicitante: 'http://192.168.1.61:8889/solicitante/sesion', 
  peticionConsultaServicioTodos: 'http://192.168.1.61:8889/servicio/todos/95674536-47ba-43af-8161-f329df3a04e7',
  peticionConsultaServicioTodosPorSolicitante: 'http://192.168.1.61:8889/servicio/todos/95674536-47ba-43af-8161-f329df3a04e7/solicitante',
  peticionEliminarServicioLogico: 'http://192.168.1.61:8889/servicio',
  peticionCambiarServicioANuevo: 'http://192.168.1.61:8889/servicio',
  peticionConsultaOfertaTodos: 'http://192.168.1.61:8889/servicio/oferta/todos',
  peticionConsultarPaquete: 'http://192.168.1.61:8889/paquete/servicio',
  peticionConsultaPesoContenido: 'http://192.168.1.61:8889/paquete/peso/contenido',
  peticionRegistrarContenido: 'http://192.168.1.61:8889/paquete/contenido/nuevo',
  peticionRegistrarPeso: 'http://192.168.1.61:8889/paquete/peso/nuevo',
  peticionRegistrarPaquete: 'http://192.168.1.61:8889/paquete/nuevo',
  peticionRegistrarUbicacion: 'http://192.168.1.61:8889/servicio/ubicacion/nuevo',
  peticionRegistrarDestino: 'http://192.168.1.61:8889/servicio/destino/nuevo',
  peticionRegistrarServicio: 'http://192.168.1.61:8889/servicio/nuevo',
  peticionRegistrarOferta: 'http://192.168.1.61:8889/servicio/oferta/nueva',
  peticionRegistrarSolicitante: 'http://192.168.1.61:8889/solicitante/nuevo',
  peticionRegistrarPrestador: 'http://192.168.1.61:8889/prestador/nuevo',
  peticionRegistrarUbicacionPrestador: 'http://192.168.1.61:8889/prestador/ubicacion/nuevo',
  peticionConsultaPrestador: 'http://192.168.1.61:8889/prestador',
  peticionActualizarEstadoServicioEnRecorrido: 'http://192.168.1.61:8889/servicio',
  peticionConsultarServicioPoId: 'http://192.168.1.61:8889/servicio/informacion',
  peticionActualizarEstadoOferta: 'http://192.168.1.61:8889/servicio/oferta',
  peticionRegistrarCalificacion: 'http://192.168.1.61:8889/prestador'
}*/


export const endpointEnviroment = {
  loginPrestador: 'http://localhost:8889/prestador/sesion',
  loginSolicitante: 'http://localhost:8889/solicitante/sesion', 
  peticionConsultaServicioTodos: 'http://localhost:8889/servicio/todos',
  peticionConsultaServicioTodosPorSolicitante: 'http://localhost:8889/servicio/todos/solicitante',
  peticionEliminarServicioLogico: 'http://localhost:8889/servicio',
  peticionCambiarServicioANuevo: 'http://localhost:8889/servicio',
  peticionConsultaOfertaTodos: 'http://localhost:8889/servicio/oferta/todos',
  peticionConsultarPaquete: 'http://localhost:8889/paquete/servicio',
  peticionConsultaPesoContenido: 'http://localhost:8889/paquete/peso/contenido',
  peticionRegistrarContenido: 'http://localhost:8889/paquete/contenido/nuevo',
  peticionRegistrarPeso: 'http://localhost:8889/paquete/peso/nuevo',
  peticionRegistrarPaquete: 'http://localhost:8889/paquete/nuevo',
  peticionRegistrarUbicacion: 'http://localhost:8889/servicio/ubicacion/nuevo',
  peticionRegistrarDestino: 'http://localhost:8889/servicio/destino/nuevo',
  peticionRegistrarServicio: 'http://localhost:8889/servicio/nuevo',
  peticionRegistrarOferta: 'http://localhost:8889/servicio/oferta/nueva',
  peticionRegistrarSolicitante: 'http://localhost:8889/solicitante/nuevo',
  peticionRegistrarPrestador: 'http://localhost:8889/prestador/nuevo',
  peticionRegistrarUbicacionPrestador: 'http://localhost:8889/prestador/ubicacion/nuevo',
  peticionConsultaPrestador: 'http://localhost:8889/prestador',
  peticionActualizarEstadoServicioEnRecorrido: 'http://localhost:8889/servicio',
  peticionConsultarServicioPoId: 'http://localhost:8889/servicio/informacion',
  peticionActualizarEstadoOferta: 'http://localhost:8889/servicio/oferta',
  peticionRegistrarCalificacion: 'http://localhost:8889/prestador'
}