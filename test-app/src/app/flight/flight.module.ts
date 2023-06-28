import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Add this line
import { FlightFormComponent } from './components/flight-form/flight-form.component';
import { UppercaseInputDirective } from './directives/uppercase-input.directive';

@NgModule({
  declarations: [
    FlightFormComponent,
    UppercaseInputDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule // And add it here
  ],
  exports: [
    FlightFormComponent
  ]
})
export class FlightModule { }