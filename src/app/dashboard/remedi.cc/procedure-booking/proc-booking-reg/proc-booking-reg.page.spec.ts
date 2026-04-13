import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcBookingRegPage } from './proc-booking-reg.page';

describe('ProcBookingRegPage', () => {
  let component: ProcBookingRegPage;
  let fixture: ComponentFixture<ProcBookingRegPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcBookingRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
