import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AddPassengerComponent } from './add-passenger/add-passenger.component';
import { FlightServicesComponent } from './flight-services/flight-services.component';
import { PassengerComponent } from './passenger/passenger.component';
import { AdminComponent } from './admin.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import {
  MatTableModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatTabsModule,
  FormsModule , ReactiveFormsModule
  ],
  declarations: [AdminComponent,AddPassengerComponent,FlightServicesComponent,
                PassengerComponent]
})
export class AdminModule { }