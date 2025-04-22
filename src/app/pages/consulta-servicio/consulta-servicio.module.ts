import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConsultaServicioPage } from './consulta-servicio.page';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';

const routes: Routes = [{ path: '', component: ConsultaServicioPage }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, IonicStorageModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultaServicioPage]
})
export class ConsultaServicioPageModule {}

