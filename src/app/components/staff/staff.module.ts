import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './staff.component';
import { FlightSeatmapComponent } from './flight-seatmap/flight-seatmap.component';
import { PassengersComponent } from './passengers/passengers.component';
import { StaffRoutingModule } from './staff-routing.module';

import {
  MatTableModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    StaffRoutingModule,
    MatTableModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatTabsModule,
  FormsModule , ReactiveFormsModule
  ],
  declarations: [PassengersComponent,FlightSeatmapComponent,StaffComponent]
})
export class StaffModule { }