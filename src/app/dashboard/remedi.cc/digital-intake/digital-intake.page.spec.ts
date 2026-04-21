import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitalIntakePage } from './digital-intake.page';

describe('DigitalIntakePage', () => {
  let component: DigitalIntakePage;
  let fixture: ComponentFixture<DigitalIntakePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalIntakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
