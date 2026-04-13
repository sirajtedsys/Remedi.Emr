import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcedureNotePage } from './procedure-note.page';

describe('ProcedureNotePage', () => {
  let component: ProcedureNotePage;
  let fixture: ComponentFixture<ProcedureNotePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
