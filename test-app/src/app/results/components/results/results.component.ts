import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../../flight/services/data-store.service';
import { Flight } from '../../../flight/models/flight.model';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  flights!: Flight[];

  constructor(private dataStoreService: DataStoreService) {}

  ngOnInit(): void {
    this.dataStoreService.flightsData$.subscribe((flights: Flight[]) => {
      this.flights = flights;
      console.log(flights)
    });
  }
}
