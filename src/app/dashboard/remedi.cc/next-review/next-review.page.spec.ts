import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NextReviewPage } from './next-review.page';

describe('NextReviewPage', () => {
  let component: NextReviewPage;
  let fixture: ComponentFixture<NextReviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NextReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
