import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderTestPage } from './order-test.page';

describe('OrderTestPage', () => {
  let component: OrderTestPage;
  let fixture: ComponentFixture<OrderTestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
