import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PsychiatryAdultPage } from './psychiatry-adult.page';

describe('PsychiatryAdultPage', () => {
  let component: PsychiatryAdultPage;
  let fixture: ComponentFixture<PsychiatryAdultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychiatryAdultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
