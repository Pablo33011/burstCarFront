export class Login implements Respuesta
{
    nombre:String = "";
    contrasena:String = "";

  constructor()
  {

  }
    valor!: String;
}

export interface Respuesta {
    valor:String;
}