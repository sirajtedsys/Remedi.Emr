import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mobile-card',
  templateUrl: './mobile-card.page.html',
  styleUrls: ['./mobile-card.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MobileCardPage implements OnInit {

  @Input() tableData: any[] = [];
  @Input() selectedIndex: number = 0;
  constructor() { }

  ngOnInit() {
  }

  filteredMobileData() {
    if (this.selectedIndex === 0) {
      return this.tableData;
    }

    const categoryMap = ['ALL', 'WALK IN', 'SAVE'];

    return this.tableData.filter(
      row => row.category === categoryMap[this.selectedIndex]
    );
  }

  // selectedIndex:

  selectTab(index: number) {
    this.selectedIndex = index;
  }

}
