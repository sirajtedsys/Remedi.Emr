import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KnowCasePage } from './know-case.page';

describe('KnowCasePage', () => {
  let component: KnowCasePage;
  let fixture: ComponentFixture<KnowCasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowCasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
