import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeCarePage } from './home-care.page';

describe('HomeCarePage', () => {
  let component: HomeCarePage;
  let fixture: ComponentFixture<HomeCarePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
