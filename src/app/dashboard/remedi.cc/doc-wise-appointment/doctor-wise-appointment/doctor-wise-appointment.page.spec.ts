import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorWiseAppointmentPage } from './doctor-wise-appointment.page';

describe('DoctorWiseAppointmentPage', () => {
  let component: DoctorWiseAppointmentPage;
  let fixture: ComponentFixture<DoctorWiseAppointmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorWiseAppointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
