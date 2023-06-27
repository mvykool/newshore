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
  });

  constructor(private formBuilder: FormBuilder, private flightService: FlightService) { }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.flightForm.valid) {
        this.flightService.getFlights().subscribe({
            next: (flights: Flight[]) => {
                console.log(flights);
            },
            error: (error: any) => {
                console.error('Error fetching flights:', error);
            }
        });
    }
}
}