import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentActionsPage } from './appointment-actions.page';

describe('AppointmentActionsPage', () => {
  let component: AppointmentActionsPage;
  let fixture: ComponentFixture<AppointmentActionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentActionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
