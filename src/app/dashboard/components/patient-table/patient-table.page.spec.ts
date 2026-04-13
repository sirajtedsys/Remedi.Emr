import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientTablePage } from './patient-table.page';

describe('PatientTablePage', () => {
  let component: PatientTablePage;
  let fixture: ComponentFixture<PatientTablePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
