import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PAFormulationPage } from './p-a-formulation.page';

describe('PAFormulationPage', () => {
  let component: PAFormulationPage;
  let fixture: ComponentFixture<PAFormulationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PAFormulationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
