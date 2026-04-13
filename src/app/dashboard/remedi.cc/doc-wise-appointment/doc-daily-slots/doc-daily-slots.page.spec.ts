import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocDailySlotsPage } from './doc-daily-slots.page';

describe('DocDailySlotsPage', () => {
  let component: DocDailySlotsPage;
  let fixture: ComponentFixture<DocDailySlotsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDailySlotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
