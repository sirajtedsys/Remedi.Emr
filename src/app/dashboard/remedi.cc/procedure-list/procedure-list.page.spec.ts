import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcedureListPage } from './procedure-list.page';

describe('ProcedureListPage', () => {
  let component: ProcedureListPage;
  let fixture: ComponentFixture<ProcedureListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
