import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroServicioPage } from './servicio-registro.page';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { MapaSelectorModule } from 'src/app/shared/mapa-selector/mapa-selector.module';

const routes: Routes = [{ path: '', component: RegistroServicioPage }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, IonicStorageModule, ReactiveFormsModule,
    RouterModule.forChild(routes), MapaSelectorModule
  ],
  declarations: [RegistroServicioPage]
})
export class RegistraServicioPageModule {}

