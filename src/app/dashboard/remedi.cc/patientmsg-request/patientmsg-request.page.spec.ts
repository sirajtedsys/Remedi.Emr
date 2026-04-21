import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientmsgRequestPage } from './patientmsg-request.page';

describe('PatientmsgRequestPage', () => {
  let component: PatientmsgRequestPage;
  let fixture: ComponentFixture<PatientmsgRequestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientmsgRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
