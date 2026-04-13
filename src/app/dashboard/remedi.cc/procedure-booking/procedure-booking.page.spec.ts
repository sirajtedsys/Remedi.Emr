import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcedureBookingPage } from './procedure-booking.page';

describe('ProcedureBookingPage', () => {
  let component: ProcedureBookingPage;
  let fixture: ComponentFixture<ProcedureBookingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
