import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightsComponent } from './components/flights/flights.component';
import { AdminComponent } from './components/admin/admin.component';
import { StaffComponent } from './components/staff/staff.component';
import { ManagePassengersComponent } from './components/staff/manage-passengers/manage-passengers.component';

const routes: Routes = [
  { path: '', component: FlightsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'staff', component: StaffComponent },
  { path : 'staff/passenger', component: ManagePassengersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
