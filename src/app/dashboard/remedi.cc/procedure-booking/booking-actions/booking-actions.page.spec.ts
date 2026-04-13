import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingActionsPage } from './booking-actions.page';

describe('BookingActionsPage', () => {
  let component: BookingActionsPage;
  let fixture: ComponentFixture<BookingActionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingActionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
