export const environment = {
  production: false,
  mapboxAccessToken: 'pk.eyJ1IjoicHJveWVjdG8yNSIsImEiOiJjbTl2bTd5NWUwbzdnMmlwczVkYzB4ZTQ0In0.LNXhyIZXk1845kMFcGG0BA',
  firebaseConfig: {
    apiKey: "AIzaSyDkh_HlNBYAmWs2OJQzjkVNXTo4EHRjj7w",
    authDomain: "burstcar-d9894.firebaseapp.com",
    projectId: "burstcar-d9894",
    storageBucket: "burstcar-d9894.firebasestorage.app",
    messagingSenderId: "200348968824",
    appId: "1:200348968824:web:22e820bba9b4f8fc324a8d",
    measurementId: "G-9CQ3MVR56W"    
  }
};

/*export const endpointEnviroment = {
  loginPrestador: 'http://10.0.2.2:8889/prestador/sesion',
  loginSolicitante: 'http://10.0.2.2:8889/solicitante/sesion', 
  peticionConsultaServicioTodos: 'http://10.0.2.2:8889/servicio/todos/95674536-47ba-43af-8161-f329df3a04e7',
  peticionConsultaServicioTodosPorSolicitante: 'http://10.0.2.2:8889/servicio/todos/95674536-47ba-43af-8161-f329df3a04e7/solicitante',
  peticionEliminarServicioLogico: 'http://10.0.2.2:8889/servicio',
  peticionCambiarServicioANuevo: 'http://10.0.2.2:8889/servicio',
  peticionConsultaOfertaTodos: 'http://10.0.2.2:8889/servicio/oferta/todos',
  peticionConsultarPaquete: 'http://10.0.2.2:8889/paquete/servicio',
  peticionConsultaPesoContenido: 'http://10.0.2.2:8889/paquete/peso/contenido',
  peticionRegistrarContenido: 'http://10.0.2.2:8889/paquete/contenido/nuevo',
  peticionRegistrarPeso: 'http://10.0.2.2:8889/paquete/peso/nuevo',
  peticionRegistrarPaquete: 'http://10.0.2.2:8889/paquete/nuevo',
  peticionRegistrarUbicacion: 'http://10.0.2.2:8889/servicio/ubicacion/nuevo',
  peticionRegistrarDestino: 'http://10.0.2.2:8889/servicio/destino/nuevo',
  peticionRegistrarServicio: 'http://10.0.2.2:8889/servicio/nuevo',
  peticionRegistrarOferta: 'http://10.0.2.2:8889/servicio/oferta/nueva',
  peticionRegistrarSolicitante: 'http://10.0.2.2:8889/solicitante/nuevo',
  peticionRegistrarPrestador: 'http://10.0.2.2:8889/prestador/nuevo',
  peticionRegistrarUbicacionPrestador: 'http://10.0.2.2:8889/prestador/ubicacion/nuevo',
  peticionConsultaPrestador: 'http://10.0.2.2:8889/prestador',
  peticionActualizarEstadoServicioEnRecorrido: 'http://10.0.2.2:8889/servicio',
  peticionConsultarServicioPoId: 'http://10.0.2.2:8889/servicio/informacion',
  peticionActualizarEstadoOferta: 'http://10.0.2.2:8889/servicio/oferta',
  peticionRegistrarCalificacion: 'http://10.0.2.2:8889/prestador'
}  */


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