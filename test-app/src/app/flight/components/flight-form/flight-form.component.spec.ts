import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FlightFormComponent } from './flight-form.component';
import { ReactiveFormsModule } from '@angular/forms';
// Other imports

describe('FlightFormComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
  
    });
  });

  let component: FlightFormComponent;
  let fixture: ComponentFixture<FlightFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightFormComponent]
    });
    fixture = TestBed.createComponent(FlightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


