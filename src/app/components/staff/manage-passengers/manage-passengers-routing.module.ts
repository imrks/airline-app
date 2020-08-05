import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePassengersComponent } from './/manage-passengers.component';

const routes: Routes = [
  {path: '', component: ManagePassengersComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePassengerRoutingModule { }