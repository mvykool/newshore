import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../../services/flight.service';

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
      // Aquí puedes realizar la lógica cuando el formulario sea válido y se envíe.
      // Por ejemplo, podrías llamar a un método en flightService que realiza la petición a la API.
    }
  }
}