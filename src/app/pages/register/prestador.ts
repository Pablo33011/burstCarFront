export interface PrestadorRegistro {
    numeroIdentificacion: string;
    nombre: string;
    usuario: string;
    contrasena: string;
    numeroTelefonico: number;
    idUbicacion: string;
    categoriaIdentificador: string;
  }

export interface UbicacionPrestadorRegistro {
    numeroVia: string;
    direccion: string;
    latitud: number;
    longitud: number;
    detalleAdicional: string;
    nombrePais: string;
    nombreDepartamento: string;
    nombreCiudad: string;
    nombreCorregimiento: string;
    nombreVia: string;
  }  