import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ManagePassengersComponent } from './manage-passengers.component';
import { CheckInComponent } from './check-in/check-in.component';
import { PassengerServicesComponent } from './passenger-services/passenger-services.component';
import { ManagePassengerRoutingModule } from './manage-passengers-routing.module';

import {
  MatTableModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ManagePassengerRoutingModule,
    MatTableModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatTabsModule,
  FormsModule , ReactiveFormsModule
  ],
  declarations: [ManagePassengersComponent,PassengerServicesComponent,CheckInComponent]
})
export class ManagePassengerModule { }