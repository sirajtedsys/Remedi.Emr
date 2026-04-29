import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicinePrescriptionPage } from './medicine-prescription.page';

describe('MedicinePrescriptionPage', () => {
  let component: MedicinePrescriptionPage;
  let fixture: ComponentFixture<MedicinePrescriptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinePrescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
