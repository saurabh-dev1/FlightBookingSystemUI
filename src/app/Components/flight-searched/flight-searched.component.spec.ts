import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchedComponent } from './flight-searched.component';

describe('FlightSearchedComponent', () => {
  let component: FlightSearchedComponent;
  let fixture: ComponentFixture<FlightSearchedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightSearchedComponent]
    });
    fixture = TestBed.createComponent(FlightSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
