import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TrackingSolicitantePage } from './tracking-solicitante.page';
import { RouterModule } from '@angular/router';
import { MapaSelectorModule } from 'src/app/shared/mapa-selector/mapa-selector.module';

@NgModule({
  declarations: [TrackingSolicitantePage],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule, MapaSelectorModule,
    RouterModule.forChild([
      {
        path: '',
        component: TrackingSolicitantePage
      }
    ])
  ]
})
export class TrackingSolicitantePageModule {}
