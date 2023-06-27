import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightFormComponent } from './components/flight-form/flight-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [FlightFormComponent],
	imports: [CommonModule, ReactiveFormsModule]
})
export class FlightModule { }