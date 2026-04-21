import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var $: any; // Declare $ to use jQuery for Bootstrap modal functions

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModalPage implements OnInit,OnChanges {

  @Input() DropDownData: any[] = [];
  @Input() Headers: any[] = [];
  @Input() Fields: any[] = [];
  @Input() ModalHeader: string = 'Header';
  @Input() CheckType: 'radio' | 'check' = 'radio';
  @Input() UniqueField = '';
  @Input() SelectedItems: any[] = [];

  @Output() modalDismissed = new EventEmitter<any>();

  searchQuery: string = '';
  filteredData: any[] = [];
  SelectedList: any[] = [];

  // @ViewChild('exampleModal') modalElement!: ElementRef;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    this.filteredData = this.DropDownData;
    this.SelectedList = [...this.SelectedItems];
  }

  // Method to show the modal (can be called from the parent component)
  public show() {
    // $(this.modalElement.nativeElement).modal('show');
  }

  // Method to dismiss the modal
  public dismiss() {
    // $(this.modalElement.nativeElement).modal('hide');
    this.modalDismissed.emit({ selected: null, role: 'cancel' });
  }

  // Method called when the 'Back' button is clicked
  DismissModal() {
    this.dismiss();
  }

  // Method to save and dismiss the modal with data
  Save() {
    // $(this.modalElement.nativeElement).modal('hide');
    this.modalDismissed.emit({ selected: this.SelectedList, role: 'confirm' });
  }

  SelectAll(event: any) {
    const isChecked = event.target.checked;
    this.SelectedList = isChecked ? [...this.filteredData] : [];
  }

  SingleSelection(event: any, item: any) {
    const isChecked = event.target.checked;
    if (this.CheckType === 'check') {
      if (isChecked) {
        this.SelectedList.push(item);
      } else {
        this.SelectedList = this.SelectedList.filter(x => x[this.UniqueField] !== item[this.UniqueField]);
      }
    } else { // 'radio' type
      if (isChecked) {
        this.SelectedList = [item];
        // For radio, we can automatically save and close
        this.Save();
      } else {
        this.SelectedList = [];
      }
    }
  }

  filterDropdown(): void {
    const query = this.searchQuery.toString().toLowerCase();
    this.filteredData = this.DropDownData.filter((item) =>
      this.Fields.some((field) =>
        item[field]?.toString().toLowerCase().includes(query)
      )
    );
  }
}