import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerServicesComponent } from './passenger-services.component';

describe('PassengerServicesComponent', () => {
  let component: PassengerServicesComponent;
  let fixture: ComponentFixture<PassengerServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
