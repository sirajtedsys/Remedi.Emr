import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-item-list-table',
  templateUrl: './item-list-table.page.html',
  styleUrls: ['./item-list-table.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ItemListTablePage implements OnInit {


    SelectedList:any[]=[]

  @Input() DropDownData:any[]=[]
  @Input() Headers:any[]=[]
  @Input() Fields:any[]=[]  
  @Input() ModalHeader:string='Header'  
  @Input() gridColumns:string='5fr 5fr'
  // @Input() SelectedItems:any[]=[]  
  @Output() itemSelected = new EventEmitter<any>();
  
  filteredData: any[]=[];
  
  
  
  
  // @Input() top: string = '0px';
  // @Input() left: string = '0px';
  // @Input() SearchTerm: string = '';
  // @Input() Search: boolean = false;
  
  // @Output() WindowClosed = new EventEmitter<any>();

  // searchQuery: string = '';
  // filteredData: any[] = [];

  constructor(private modalcontroller: ModalController) {
    // Register icons for standalone components
    addIcons({ closeOutline, searchOutline });
    
  }

  ngOnInit(): void {
    // this.filteredData = [...this.dropdownData];
       console.log(this.DropDownData);
    this.filteredData = this.DropDownData
    // this.SelectedList=this.SelectedItems
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['DropDownData'] && this.DropDownData) {
      this.filteredData = [...this.DropDownData];
      // if (this.searchQuery) this.filterDropdown();
    }
    // if (changes['SearchTerm'] && this.SearchTerm) {
    //   this.searchQuery = this.SearchTerm;
    //   this.filterDropdown();
    // }
    console.log(this.filteredData);
  //  console.log(  this.Field1)
  }



  onDataSelected(event:any,item: any) {
    this.itemSelected.emit(item);
  }


 



  // closeDropdown() {
  //   this.WindowClosed.emit(true);
  // }
}
