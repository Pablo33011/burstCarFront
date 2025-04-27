export const environment = {
    production: false,
    mapboxAccessToken: '',
    firebaseConfig: {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""    
    }
  };

export const endpointEnviroment = {
  loginPrestador: 'http://localhost:8889/prestador/sesion',
  loginSolicitante: 'http://localhost:8889/solicitante/sesion', 
  peticionConsultaServicioTodos: 'http://localhost:8889/servicio/todos/95674536-47ba-43af-8161-f329df3a04e7',
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
  peticionActualizarEstadoOferta: 'http://localhost:8889/servicio/oferta'
}  