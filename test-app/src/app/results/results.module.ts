import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './components/results/results.component';
import { FlightModule } from '../flight/flight.module';
import { ResultRoutingModule } from './results-routing.module';


@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    ResultRoutingModule,
    FlightModule
  ]
})
export class ResultsModule { }
