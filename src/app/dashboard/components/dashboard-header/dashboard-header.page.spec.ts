import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardHeaderPage } from './dashboard-header.page';

describe('DashboardHeaderPage', () => {
  let component: DashboardHeaderPage;
  let fixture: ComponentFixture<DashboardHeaderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
