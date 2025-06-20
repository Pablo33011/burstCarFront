import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaqueteServicio } from './paquete-registro.servicio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-paquete',
  templateUrl: './paquete-registro.page.html',
  styleUrls: ['./paquete-registro.page.scss']
})
export class PaqueteRegistroPage implements OnInit{

  paqueteForm: FormGroup;
  idServicio: string = '';
  cargando = false;
  pasoActual: number = 1;

  constructor(
    private fb: FormBuilder,
    private paqueteServicio: PaqueteServicio,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.paqueteForm = this.crearFormulario();
  }

  private crearFormulario(): FormGroup {
    return this.fb.group({
      descripcionContenido: ['', Validators.required],
      fragil: [false],
      valorAproximado: [0, Validators.required],
      monedaPaquete: ['', Validators.required],
      valorPeso: ['', Validators.required],
      nombreMedida: ['', Validators.required],
      descripcionPaquete: ['', Validators.required],
      tipoPaqueteNombre: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.idServicio = this.route.snapshot.paramMap.get('id') ?? '';
  }

  async registrarPaquete() {
    if (this.paqueteForm.invalid) {
      this.paqueteForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    const datos = this.paqueteForm.value;

    try {
      const contenidoId = await this.registrarContenido(datos);
      await this.registrarPeso(datos, contenidoId);
      await this.registrarPaqueteFinal(datos, contenidoId);
      this.router.navigateByUrl(`/paquete/servicio/${this.idServicio}/informacion`)
      .then(() => {
      window.location.reload();
  });
    } catch (err) {
      console.error('Error en el registro del paquete:', err);
    } finally {
      this.cargando = false;
    }
  }

  private registrarContenido(datos: any): Promise<string> {
    return this.paqueteServicio.registrarContenido({
      descripcion: datos.descripcionContenido,
      fragil: datos.fragil,
      valorAproximado: datos.valorAproximado,
      monedaPaquete: datos.monedaPaquete
    }).toPromise();
  }

  private registrarPeso(datos: any, contenidoId: string): Promise<any> {
    return this.paqueteServicio.registrarPeso({
      valor: datos.valorPeso,
      nombreMedida: datos.nombreMedida,
      contenidoId
    }).toPromise();
  }

  private registrarPaqueteFinal(datos: any, contenidoId: string): Promise<any> {
    return this.paqueteServicio.registrarPaquete({
      descripcion: datos.descripcionPaquete,
      tipoPaqueteNombre: datos.tipoPaqueteNombre,
      contenido: contenidoId,
      servicioPaquete: this.idServicio
    }).toPromise();
  }

  regresar() {
    this.router.navigateByUrl(`/servicio/todos`)
    .then(() => {
    window.location.reload();
  });
  }

    siguientePaso() {
    if (this.pasoActual < 2) {
      this.pasoActual++;
    }
  }
  
  anteriorPaso() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }
}
