import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPage } from './register.page';
import { MapaSelectorModule } from 'src/app/shared/mapa-selector/mapa-selector.module';

const routes: Routes = [{ path: '', component: RegisterPage }];

@NgModule({
  imports:[CommonModule, FormsModule, ReactiveFormsModule, MapaSelectorModule,
    IonicModule, RouterModule.forChild(routes)],
  declarations:[RegisterPage]
})
export class RegisterPageModule {}
