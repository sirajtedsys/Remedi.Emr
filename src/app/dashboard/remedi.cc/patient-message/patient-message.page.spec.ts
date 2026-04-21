import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientMessagePage } from './patient-message.page';

describe('PatientMessagePage', () => {
  let component: PatientMessagePage;
  let fixture: ComponentFixture<PatientMessagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
