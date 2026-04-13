import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoDataPage } from './no-data.page';

describe('NoDataPage', () => {
  let component: NoDataPage;
  let fixture: ComponentFixture<NoDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
