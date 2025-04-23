import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaqueteServicio } from './paquete-registro.servicio';
import { StorageService } from 'src/app/shared/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-paquete',
  templateUrl: './paquete-registro.page.html',
  styleUrls: ['./paquete-registro.page.scss']
})
export class PaqueteRegistroPage implements OnInit{

  paqueteForm: FormGroup;
  idServicio: string = '';

  constructor(
    private fb: FormBuilder,
    private paqueteServicio: PaqueteServicio,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.paqueteForm = this.fb.group({
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
    this.idServicio = this.route.snapshot.paramMap.get('id')!;
  }

  async registrarPaquete() {
    const datos = this.paqueteForm.value;

    try {
      const contenidoRes = await this.paqueteServicio.registrarContenido({
        descripcion: datos.descripcionContenido,
        fragil: datos.fragil,
        valorAproximado: datos.valorAproximado,
        monedaPaquete: datos.monedaPaquete
      }).toPromise();

      const contenidoId = contenidoRes;
      console.log("ContendioId: " + contenidoId)

      await this.paqueteServicio.registrarPeso({
        valor: datos.valorPeso,
        nombreMedida: datos.nombreMedida,
        contenidoId: contenidoId
      }).toPromise();

      const paqueteRes = await this.paqueteServicio.registrarPaquete({
        descripcion: datos.descripcionPaquete,
        tipoPaqueteNombre: datos.tipoPaqueteNombre,
        contenido: contenidoId,
        servicioPaquete: this.idServicio
      }).toPromise();

      console.log('Paquete registrado con ID:', paqueteRes);
      this.router.navigateByUrl(`/paquete/servicio/${this.idServicio}/informacion`);

    } catch (err) {
      console.error('Error en el registro del paquete:', err);
    }
  }
}
