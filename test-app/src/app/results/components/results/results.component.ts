import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStoreService } from '../../../flight/services/data-store.service';
import { Flight } from '../../../flight/models/flight.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  journey: any;
  backArrow  = 'assets/images/left-arrow.png';

  constructor(private dataStoreService: DataStoreService, private router: Router) {}

  goBack(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.dataStoreService.flightsData$.subscribe((flights: Flight[]) => {
      this.journey = {
        Journey: {
          Origin: flights[0].departureStation,
          Destination: flights[flights.length - 1].arrivalStation,
          Price: flights.reduce((sum, flight) => sum + flight.price, 0),
          Flights: flights.map((flight) => ({
            Origin: flight.departureStation,
            Destination: flight.arrivalStation,
            Price: flight.price,
            Transport: {
              FlightCarrier: flight.flightCarrier,
              FlightNumber: flight.flightNumber
            }
          }))
        }
      };
    });
  }
}