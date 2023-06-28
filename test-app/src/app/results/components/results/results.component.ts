import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStoreService } from '../../../services/data-store.service';
import { CurrencyService } from '../../../services/currency.service';
import { Flight } from '../../../models/flight.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  journey: any;
  backArrow  = 'assets/images/left-arrow.png';
  selectedCurrency!: string;
  conversionRate: number = 1;
  private currencySub!: Subscription;


  constructor(private dataStoreService: DataStoreService, private router: Router, private currencyService: CurrencyService) {}

  goBack(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.currencyService.selectedCurrency$.subscribe((selectedCurrency: string) => {
      this.selectedCurrency = selectedCurrency; // This line was missing
      if (selectedCurrency !== 'USD') {
        this.currencyService.convertCurrency('USD', selectedCurrency)
          .subscribe((rate: number) => {
            this.conversionRate = rate;
          });
      } else {
        this.conversionRate = 1;
      }
    });
    
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

  ngOnDestroy() {
    if (this.currencySub) {
      this.currencySub.unsubscribe();
    }
  }


}