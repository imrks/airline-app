import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './staff.component';
import { AuthGuard } from '../../service/auth.guard';
import { ManagePassengerModule } from './manage-passengers/manage-passengers.module';

const routes: Routes = [
  {path: '', component: StaffComponent },
  {path: 'passenger', loadChildren: () => ManagePassengerModule,canActivate: [AuthGuard],data: { animation: 'isRight' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }