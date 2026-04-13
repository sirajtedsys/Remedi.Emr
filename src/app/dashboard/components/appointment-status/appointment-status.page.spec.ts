import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentStatusPage } from './appointment-status.page';

describe('AppointmentStatusPage', () => {
  let component: AppointmentStatusPage;
  let fixture: ComponentFixture<AppointmentStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
