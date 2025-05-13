export interface Peso {
  identificador: string;
  valor: number;
  medidaPaquete: MedidaPaquete;
}

export interface MedidaPaquete {
  identificador: string;
  nombreMedida: string;
  abreviaturaMedida: string;
  identificadorTipoUnidad: string;
  nombreTipoUnidadMetrica: string;
}