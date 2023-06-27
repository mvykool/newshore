import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Add this line
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { FlightFormComponent } from './components/flight-form/flight-form.component';

@NgModule({
  declarations: [
    FlightListComponent,
    FlightFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule // And add it here
  ],
  exports: [
    FlightListComponent,
    FlightFormComponent
  ]
})
export class FlightModule { }