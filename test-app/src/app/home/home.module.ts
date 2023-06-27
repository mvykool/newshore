import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightModule } from '../flight/flight.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlightModule
  ]
})
export class HomeModule { }
