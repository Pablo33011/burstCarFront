export interface Prestador {
    identificador: string;
    numeroIdentificacion: string;
    nombre: string;
    numeroTelefonico: number;
    categoriaIdentificacion: string;
    ubicacionPrestador: {
      identificador: string;
      numeroVia: string;
      direccion: string;
      latitud: number;
      longitud: number;
      detalleAdicional: string;
      delimitacionPrestador: {
        identificador: string;
        nombreCorregimiento: string;
        nombreCiudad: string;
        identificacionCiudad: string;
        nombreDepartamento: string;
        identificacionDepartamento: string;
        nombrePais: string;
        identificacionPais: string;
      };
      viaPrestador: {
        identificador: string;
        nombre: string;
      };
    };
    calificaciones: any[]; 
}
  