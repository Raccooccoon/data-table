import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { DeleteAlertComponent } from './components/alerts/delete-alert/delete-alert.component';

const routes: Routes = [
  {
    path: 'recording/:id',
    component: ModalWindowComponent
  },
  {
    path: 'delete/:id',
    component: DeleteAlertComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
