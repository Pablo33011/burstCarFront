import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrestadorConsultaPage } from './prestador.page';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { MapaSelectorModule } from 'src/app/shared/mapa-selector/mapa-selector.module';

const routes: Routes = [{ path: '', component: PrestadorConsultaPage }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, IonicStorageModule, ReactiveFormsModule, MapaSelectorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrestadorConsultaPage]
})
export class PrestadorServicioPageModule {}

