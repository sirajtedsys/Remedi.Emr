import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PAHistoryPage } from './p-a-history.page';

describe('PAHistoryPage', () => {
  let component: PAHistoryPage;
  let fixture: ComponentFixture<PAHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PAHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
