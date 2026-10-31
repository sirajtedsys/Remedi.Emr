import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientVisitPage } from './patient-visit.page';

describe('PatientVisitPage', () => {
  let component: PatientVisitPage;
  let fixture: ComponentFixture<PatientVisitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
