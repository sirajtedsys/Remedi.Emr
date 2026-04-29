import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PsychiatryChildPage } from './psychiatry-child.page';

describe('PsychiatryChildPage', () => {
  let component: PsychiatryChildPage;
  let fixture: ComponentFixture<PsychiatryChildPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychiatryChildPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
