import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreatmentSummaryPage } from './treatment-summary.page';

describe('TreatmentSummaryPage', () => {
  let component: TreatmentSummaryPage;
  let fixture: ComponentFixture<TreatmentSummaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
