import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent implements OnInit {
  flightForm: FormGroup = this.formBuilder.group({
    tripType: ['oneWay'],
    origin: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    destination: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    intermediaryDestinations: this.formBuilder.array([])
  });

  constructor(private formBuilder: FormBuilder, private flightService: FlightService) { }

  ngOnInit(): void {}

  get getIntermediaryDestinations(): FormArray {
    return this.flightForm.get('intermediaryDestinations') as FormArray;
  }

  addIntermediaryDestination(): void {
    if (this.getIntermediaryDestinations.controls.length < 4) {
      this.getIntermediaryDestinations.push(this.formBuilder.group({
        origin: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
        destination: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
      }));
    }
  }

  removeIntermediaryDestination(index: number) {
    this.getIntermediaryDestinations.removeAt(index);
  }

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