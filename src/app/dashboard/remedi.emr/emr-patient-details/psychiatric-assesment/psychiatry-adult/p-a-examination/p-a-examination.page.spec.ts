import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PAExaminationPage } from './p-a-examination.page';

describe('PAExaminationPage', () => {
  let component: PAExaminationPage;
  let fixture: ComponentFixture<PAExaminationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PAExaminationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
