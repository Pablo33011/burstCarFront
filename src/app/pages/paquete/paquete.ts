export interface Paquete {
    identificador: string;
    descripcion: string;
    tipoPaquete: TipoPaquete;
    contenido: Contenido;
  }
  
  export interface TipoPaquete {
    identificador: string;
    descripcion: string;
    nombre: string;
  }
  
  export interface Contenido {
    identificador: string;
    descripcion: string;
    fragil: boolean;
    valorAproximado: number;
    monedaPaquete: MonedaPaquete;
  }
  
  export interface MonedaPaquete {
    identificador: string;
    nombreMoneda: string;
    codigoMoneda: string;
  }  