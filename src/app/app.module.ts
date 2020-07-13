import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';
import { FlightsComponent } from './components/flights/flights.component';
import { PassengerComponent } from './components/admin/passenger/passenger.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddPassengerComponent } from './components/admin/add-passenger/add-passenger.component';
import { FlightServicesComponent } from './components/admin/flight-services/flight-services.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    FlightsComponent,
    PassengerComponent,
    AdminComponent,
    AddPassengerComponent,
    FlightServicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase,'angularfs'),
    AngularFirestoreModule,
    BrowserAnimationsModule,
  MatTableModule,
  MatPaginatorModule,
  ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
