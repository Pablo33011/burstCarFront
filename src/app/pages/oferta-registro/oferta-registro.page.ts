import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaServicio } from './oferta-registro.servicio';
import { StorageService } from 'src/app/shared/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaServicio } from 'src/app/services/alertas-errores.servicio';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-registro-oferta',
  templateUrl: './oferta-registro.page.html',
  styleUrls: ['./oferta-registro.page.scss']
})
export class OfertaRegistroPage implements OnInit{
  ofertaForm: FormGroup;
  idServicio!: string;
  fechaActual: string = new Date().toISOString();
  fechaMinima: string = new Date().toISOString();


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private storageServicio: StorageService,
    private ofertaServicio: OfertaServicio,
    private alerta: AlertaServicio
  ) {
    this.ofertaForm = this.fb.group({
      descripcion: ['', Validators.required],
      costo: ['', Validators.required],
      monedaServicio: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estadoOferta: ['Oferta nueva'],
      servicio: [''],
      prestadorServicioIdentificacion: [{ value: '', disabled: true }]
    });
  }

  ngOnInit() {
    this.idServicio = this.route.snapshot.paramMap.get('id')!;
    this.ofertaForm.patchValue({ servicio: this.idServicio });
    this.obtenerIdentificacion();
    this.ofertaForm.get('fechaInicio')?.valueChanges.subscribe(() => this.calcularCostoAutomatico());
    this.ofertaForm.get('fechaFin')?.valueChanges.subscribe(() => this.calcularCostoAutomatico());
  }

  calcularCostoAutomatico() {
  const fechaInicio = new Date(this.ofertaForm.get('fechaInicio')?.value);
  const fechaFin = new Date(this.ofertaForm.get('fechaFin')?.value);

  if ((fechaInicio && fechaFin) && (fechaFin > fechaInicio)) {
    const diferenciaHoras = (fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60);
    const costoCalculado = Math.ceil(diferenciaHoras) * 5000;

    this.ofertaForm.patchValue({
      costo: costoCalculado
    }, { emitEvent: false });
  }
}


  async obtenerIdentificacion() {
    const token = await this.storageServicio.obtener('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.ofertaForm.patchValue({
        prestadorServicioIdentificacion: payload.numeroIdentificacion
      });
    }
  }

  registrarOferta() {
    if (!this.ofertaForm.valid) {
      this.alerta.mostrarError({ message: 'Por favor completa todos los campos requeridos.' });
      return;
    }

    const datos = this.ofertaForm.getRawValue();

    this.ofertaServicio.registrarOferta(datos).subscribe({
      next: async() => {
        this.alerta.mostrarExito('Oferta registrada con éxito');

      await LocalNotifications.schedule({
        notifications: [
          {
            title: '¡Nueva oferta disponible!',
            body: `Un prestador ha enviado una oferta para tu servicio #${this.idServicio}`,
            id: new Date().getTime(),
            schedule: { at: new Date(new Date().getTime() + 1000) },
            sound: null,
            smallIcon: 'ic_stat_icon_config_sample',
            attachments: null,
            actionTypeId: '',
            extra: null
          }
        ]
      });

        this.router.navigateByUrl('/oferta/todas/' + this.idServicio)
        .then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        this.alerta.mostrarError(err, 'Error al registrar la oferta');
      }
    });
  }

  regresar() {
    this.router.navigateByUrl(`/servicio/todos`)
    .then(() => {
    window.location.reload();
  });
  }

}
