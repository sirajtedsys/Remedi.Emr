import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PsychiatricAssesmentPage } from './psychiatric-assesment.page';

describe('PsychiatricAssesmentPage', () => {
  let component: PsychiatricAssesmentPage;
  let fixture: ComponentFixture<PsychiatricAssesmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychiatricAssesmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
