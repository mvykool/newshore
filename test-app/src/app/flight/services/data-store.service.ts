import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private flightsDataSubject: BehaviorSubject<Flight[]> = new BehaviorSubject<Flight[]>([]);
  public flightsData$: Observable<Flight[]> = this.flightsDataSubject.asObservable();

  constructor() { }

  public updateFlightsData(flights: Flight[]): void {
    this.flightsDataSubject.next(flights);
  }
}