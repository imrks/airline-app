import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightServicesComponent } from './flight-services.component';

describe('FlightServicesComponent', () => {
  let component: FlightServicesComponent;
  let fixture: ComponentFixture<FlightServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
