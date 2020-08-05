import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightsComponent } from './components/flights/flights.component';
import { StaffModule } from './components/staff/staff.module';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from '../app/service/auth.guard';
import { AdminModule } from './components/admin/admin.module';

const routes: Routes = [
  { path:'', redirectTo:'/login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'flights', component: FlightsComponent,canActivate: [AuthGuard],data: { animation: 'isRight' } },
  { path: 'admin', loadChildren: () => AdminModule,canActivate: [AuthGuard],data: { animation: 'isLeft' } },
  { path: 'staff', loadChildren: () => StaffModule,canActivate: [AuthGuard],data: { animation: 'isLeft' } },
  { path: '**', redirectTo: '/flights'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
