import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NpassessmentPage } from './npassessment.page';

describe('NpassessmentPage', () => {
  let component: NpassessmentPage;
  let fixture: ComponentFixture<NpassessmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NpassessmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
