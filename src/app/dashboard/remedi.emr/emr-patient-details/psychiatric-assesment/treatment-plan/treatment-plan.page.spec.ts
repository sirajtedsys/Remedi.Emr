import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreatmentPlanPage } from './treatment-plan.page';

describe('TreatmentPlanPage', () => {
  let component: TreatmentPlanPage;
  let fixture: ComponentFixture<TreatmentPlanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
