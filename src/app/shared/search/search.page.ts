import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges, // <-- Import OnChanges
  SimpleChanges, // <-- Import SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SearchPage implements OnInit, OnChanges { // <-- Implement OnChanges
  // searchTerm: string = '';
  allItems: any[] = [];
  filteredItems: any[] = [];

  @Input() SearchData: any[] = []; // Pass array containing the data to filter
  @Input() SearcHeaders: any[] = []; // Pass an array of headers to show in header
  @Input() KeyNames: any[] = []; // Pass an array of keynames to bind in loop and search through
  @Input() ShowSearchBox:boolean=false
  @Input() searchTerm:string=''
  @Output() SelectedObject = new EventEmitter<any>(); // Use EventEmitter for @Output


  constructor() {}

  ngOnInit() {
    // ngOnInit is typically for one-time initialization, not for reacting to input changes
    // Leave it empty if you're handling data initialization in ngOnChanges
  }

  // ngOnChanges is called when any data-bound input property changes
  ngOnChanges(changes: SimpleChanges) {
    // Check if the 'SearchData' input property has changed
    if (changes['SearchData'] && changes['SearchData'].currentValue) {
      console.log('SearchData changed:', this.SearchData);
      
      console.log(this.SearcHeaders,this.KeyNames)
      this.allItems = [...this.SearchData]; // Use spread operator to create a new array reference
      this.filteredItems = [...this.allItems]; // Initialize filteredItems with all data
      // this.searchTerm = ''; // Optionally clear the search term when new data arrives
    }
  }

  onSearchChange() {
    if (this.searchTerm.trim() === '') {
      this.filteredItems = [...this.allItems];
    } else {
      this.performSearch();
    }
  }

  performSearch() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase().trim();

    if (lowerCaseSearchTerm === '') {
      this.filteredItems = [...this.allItems];
      return;
    }

    this.filteredItems = this.allItems.filter((item) => {
      return this.KeyNames.some((key) => {
        const value = item[key];
        return (
          value != null &&
          String(value).toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
    });
  }

  selectItem(item: any) {
    this.SelectedObject.emit(item);
  }
}