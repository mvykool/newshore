import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent implements OnInit {
  flightForm: FormGroup = this.formBuilder.group({
    origin: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    destination: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
  }, { validators: this.originDestinationValidator });

  constructor(private formBuilder: FormBuilder, private flightService: FlightService) { }

  ngOnInit(): void {}

  // The custom validator function
  originDestinationValidator(group: FormGroup): {[key: string]: boolean} | null {
    const originControl = group.controls['origin'];
    const destinationControl = group.controls['destination'];
  
    // check if both fields have a value and if those values are the same
    if (originControl.value && destinationControl.value && originControl.value === destinationControl.value) {
      return { 'originDestinationSame': true };
    }
    return null;  // if there's no issue, return null
  }

  onSubmit(): void {
    if (this.flightForm.valid) {
      const origin = this.flightForm.value.origin;
      const destination = this.flightForm.value.destination;

      this.flightService.getFlights().subscribe({
        next: (flights: Flight[]) => {
          const routeSegment = this.findRoute(origin, destination, flights, []);
          if (routeSegment) {
            const journey = {
              Journey: {
                Origin: origin,
                Destination: destination,
                Price: routeSegment.flights.reduce((sum, current) => sum + current.price, 0),
                Flights: routeSegment.flights.map(flight => ({
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
            console.log('Journey:', journey);
          } else {
            console.log('Route not found from', origin, 'to', destination);
          }
        },
        error: (error: any) => {
          console.error('Error fetching flights:', error);
        },
      });
    }
  }

  findRoute(origin: string, destination: string, flights: Flight[], route: Flight[]): { origin: string, destination: string, flights: Flight[] } | null {
    const departingFlights = flights.filter(flight => flight.departureStation === origin);

    for (const flight of departingFlights) {
      if (flight.arrivalStation === destination) {
        return { origin: origin, destination: destination, flights: [...route, flight] };
      } else if (!route.find(r => r.departureStation === flight.arrivalStation)) {
        const newRoute = this.findRoute(flight.arrivalStation, destination, flights, [...route, flight]);
        if (newRoute) {
          return newRoute;
        }
      }
    }

    return null;
  }
}