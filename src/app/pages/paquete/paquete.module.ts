import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaqueteConsultaPage } from './paquete.page';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';

const routes: Routes = [{ path: '', component: PaqueteConsultaPage }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, IonicStorageModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaqueteConsultaPage]
})
export class PaqueteServicioPageModule {}

