import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressNotePage } from './progress-note.page';

describe('ProgressNotePage', () => {
  let component: ProgressNotePage;
  let fixture: ComponentFixture<ProgressNotePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
