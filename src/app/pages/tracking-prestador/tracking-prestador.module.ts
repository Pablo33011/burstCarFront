import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TrackingPrestadorPage } from './tracking-prestador.page';
import { RouterModule } from '@angular/router';
import { MapaSelectorModule } from 'src/app/shared/mapa-selector/mapa-selector.module';

@NgModule({
  declarations: [TrackingPrestadorPage],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule, MapaSelectorModule,
    RouterModule.forChild([
      {
        path: '',
        component: TrackingPrestadorPage
      }
    ])
  ]
})
export class TrackingPrestadorPageModule {}
