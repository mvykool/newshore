import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../../../services/flight.service';
import { Flight } from '../../../models/flight.model';
import { DataStoreService } from '../../../services/data-store.service';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent implements OnInit {
  flightForm: FormGroup = this.formBuilder.group({
    origin: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    destination: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
  }, { validators: this.originDestinationValidator } as AbstractControlOptions);

  message: string = '';

  constructor(private formBuilder: FormBuilder, private flightService: FlightService, private dataStoreService: DataStoreService,
    private router: Router) { }

  ngOnInit(): void {}

originDestinationValidator(group: FormGroup): {[key: string]: boolean} | null {
  const originControl = group.controls['origin'];
  const destinationControl = group.controls['destination'];

  if (originControl.value && destinationControl.value && originControl.value === destinationControl.value) {
    return { 'originDestinationSame': true };
  }
  return null; 
}

onSubmit(): void {
  if (this.flightForm.valid) {
    const origin = this.flightForm.value.origin;
    const destination = this.flightForm.value.destination;

    let currentOrigin = origin;
    const totalRoute: Flight[] = [];

    const allDestinations = [destination];

    this.flightService.getFlights().subscribe({
      next: (flights: Flight[]) => {
        for (const currentDestination of allDestinations) {
          const routeSegment = this.findRoute(currentOrigin, currentDestination, flights, []);
          if (routeSegment) {
            totalRoute.push(...routeSegment.flights); // Push individual flights into totalRoute
            currentOrigin = currentDestination;
          } else {
            console.log('Route segment not found from', currentOrigin, 'to', currentDestination);
            break;
          }
        }

        if (totalRoute.length > 0) { 
          // Store the data in the DataStoreService
          this.dataStoreService.updateFlightsData(totalRoute);
          // Navigate to the "results" component
          this.router.navigate(['/results']);
        } else {
          this.message = 'No flights available';
        }
      },
      error: (error: any) => {
        console.error('Error fetching flights:', error);
      },
    });
  }
}

  
findRoute(current: string, destination: string, flights: Flight[], route: Flight[] = [], visited: Set<string> = new Set()): { origin: string, destination: string, flights: Flight[] } | null {
  visited.add(current);

  const departingFlights = flights.filter(flight => flight.departureStation.toUpperCase() === current.toUpperCase());

  for (const flight of departingFlights) {
      if (visited.has(flight.arrivalStation.toUpperCase())) {
          continue;
      }

      if (flight.arrivalStation.toUpperCase() === destination.toUpperCase()) {
          return { origin: current, destination: destination, flights: [...route, flight] };
      }

      const newRoute = this.findRoute(flight.arrivalStation, destination, flights, [...route, flight], visited);
      
      if (newRoute) {
          return newRoute;
      }
  }
  return null;
}}