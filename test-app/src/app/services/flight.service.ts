import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';
import { environment } from '../../environments/environment';


@Injectable({
providedIn: 'root'
})
export class FlightService {
private baseUrl = environment.apiUrl1;

constructor(private http: HttpClient) { }

getFlights(): Observable<Flight[]> {
	return this.http.get<Flight[]>(`${this.baseUrl}/flights/0`);
}
}

