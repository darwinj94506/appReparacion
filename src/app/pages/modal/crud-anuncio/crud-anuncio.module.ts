import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrudAnuncioPage } from './crud-anuncio.page';

const routes: Routes = [
  {
    path: '',
    component: CrudAnuncioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CrudAnuncioPage],
  entryComponents: [CrudAnuncioPage]
})
export class CrudAnuncioPageModule {}
