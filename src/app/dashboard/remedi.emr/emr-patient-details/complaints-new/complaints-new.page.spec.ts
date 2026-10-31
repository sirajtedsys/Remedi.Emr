import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplaintsNewPage } from './complaints-new.page';

describe('ComplaintsNewPage', () => {
  let component: ComplaintsNewPage;
  let fixture: ComponentFixture<ComplaintsNewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
