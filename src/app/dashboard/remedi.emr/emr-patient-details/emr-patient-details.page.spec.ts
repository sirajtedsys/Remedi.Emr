import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmrPatientDetailsPage } from './emr-patient-details.page';

describe('EmrPatientDetailsPage', () => {
  let component: EmrPatientDetailsPage;
  let fixture: ComponentFixture<EmrPatientDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmrPatientDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
