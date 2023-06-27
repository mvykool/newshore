import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightFormComponent } from './flight/components/flight-form/flight-form.component';

const routes: Routes = [
    {path: '', component: FlightFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
