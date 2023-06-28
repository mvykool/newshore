import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ResultsComponent } from './results.component';


  describe('ResultsComponent', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule,],
    
      });
    });
  
    let component: ResultsComponent;
    let fixture: ComponentFixture<ResultsComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ResultsComponent]
      });
      fixture = TestBed.createComponent(ResultsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

