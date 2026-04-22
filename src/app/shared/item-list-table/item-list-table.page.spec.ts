import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListTablePage } from './item-list-table.page';

describe('ItemListTablePage', () => {
  let component: ItemListTablePage;
  let fixture: ComponentFixture<ItemListTablePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
