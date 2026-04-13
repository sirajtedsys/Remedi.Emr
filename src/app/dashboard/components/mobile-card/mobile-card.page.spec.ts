import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileCardPage } from './mobile-card.page';

describe('MobileCardPage', () => {
  let component: MobileCardPage;
  let fixture: ComponentFixture<MobileCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
