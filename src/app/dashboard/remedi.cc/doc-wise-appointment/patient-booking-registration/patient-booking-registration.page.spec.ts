import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientBookingRegistrationPage } from './patient-booking-registration.page';

describe('PatientBookingRegistrationPage', () => {
  let component: PatientBookingRegistrationPage;
  let fixture: ComponentFixture<PatientBookingRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBookingRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
