import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MapaSelectorComponent } from 'src/app/shared/mapa-selector/mapa-selector.component';
import { FirebaseTrackingServicio } from 'src/app/shared/tracking/firebase-tracking.servicio';

@Component({
  selector: 'app-tracking-solicitante',
  templateUrl: './tracking-solicitante.page.html',
  styleUrls: ['./tracking-solicitante.page.scss']
})
export class TrackingSolicitantePage implements OnInit {
  servicioId = '';
  dummyForm: FormGroup;
  latitudOrigen!: number;
  longitudOrigen!: number;
  latitudDestino!: number;
  longitudDestino!: number;

  @ViewChild(MapaSelectorComponent) mapaSelector!: MapaSelectorComponent;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private firebaseTracking: FirebaseTrackingServicio
  ) {
    this.dummyForm = this.fb.group({
      latitud: [''],
      longitud: ['']
    });
  }

  ngOnInit() {
    this.servicioId = this.route.snapshot.paramMap.get('id') || '';

    this.route.queryParams.subscribe(params => {
      this.latitudOrigen = parseFloat(params['latitudOrigen']);
      this.longitudOrigen = parseFloat(params['longitudOrigen']);
      this.latitudDestino = parseFloat(params['latitudDestino']);
      this.longitudDestino = parseFloat(params['longitudDestino']);

      this.escucharTracking();
    });
  }

  escucharTracking() {
    this.firebaseTracking.escucharUbicacion(this.servicioId, ({ latitud, longitud }) => {
      if (latitud && longitud) {
        this.dummyForm.patchValue({ latitud, longitud });

        setTimeout(() => {
          this.mapaSelector.moverMarcador(latitud, longitud);
        }, 300);
      }
    });
  }
}