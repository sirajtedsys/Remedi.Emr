import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PsychiatrySummaryPage } from './psychiatry-summary.page';

describe('PsychiatrySummaryPage', () => {
  let component: PsychiatrySummaryPage;
  let fixture: ComponentFixture<PsychiatrySummaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychiatrySummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
