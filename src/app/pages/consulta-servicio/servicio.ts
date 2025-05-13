export interface Servicio {
    idServicio: string;
    descripcion: string;
    nombreSolicitante: string;
    identificacionSolicitante: string;
    nombreTipoServicio: string;
    estadoServicio: string;
    idUbicacion: string;
    latituUbicacion: number;
    longitudUbicacion: number;
    idDestino: string;
    nombreDestinario: string;
    identificaionDestinario: string;
    latituDestino: number;
    longitudDestino: number;
    costoInicialSolicitante: number;
    monedaNombre: string;
    fechaCreacion: string;
  }
  