import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent } from '@ionic/angular/standalone';
import { SidebarPage } from "./components/sidebar/sidebar.page";
import { DashboardHeaderPage } from "./components/dashboard-header/dashboard-header.page";
import { AppointmentStatusPage } from "./components/appointment-status/appointment-status.page";
import { RouterOutlet } from "@angular/router";
import { AuthService } from '../shared/services/auth.service';
import { Tabs } from '../shared/interfaces/tabs';
import { LookupService } from '../shared/services/lookup.service';
import { SharedDataService } from '../shared/services/shared-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // Ionic Components
    IonContent,
    SidebarPage,
    DashboardHeaderPage,
    AppointmentStatusPage,
    RouterOutlet
]
})
export class DashboardPage implements OnInit {

  isCollapsed: boolean = false;
  openMenu: string | null = null;




  
  TabsList1: Tabs[] = []
  TabsList2: Tabs[] = []
  AllTabs: Tabs[] = []
  AllbmTabs: Tabs[] = []








  constructor(
    private authser:AuthService,
    private lookupService:LookupService,
    private sharedData: SharedDataService
  ) {
    
      this.getAndSetDoctorId()
  }



  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }


    async getAndSetDoctorId() {
    (await this.lookupService.GetDoctorIdByEmployeeAsync()).subscribe((data: any) => {
      console.log(data);
      this.sharedData.setDoctId(data)
    })
  }
  
 
    // 12 table headings (first column empty)


    iconColumns: { [key: string]: string } = {
      
      'Vitals': 'assets/icon/vitals.png',
      'Allergy': 'assets/icon/allergy.png',
      'Comments': 'assets/icon/comment.png',
      'Insurance': 'assets/icon/insurance.png',
      'Over': 'assets/icon/mark.png',
      'Call': 'assets/icon/call.png'
    };

    categories = ['AL', 'WALK IN', 'SAVE'];
    rowsPerCategory = 5;
  
    tableData: any[] = [];
  
    // Category colors (custom classes)
    categoryColors = ['cat-al', 'cat-walkin', 'cat-save'];
  
    listItems = [
      { label: 'Booked', value: '1', colorClass: 'badge-blue' },
      { label: 'Confirmed', value: '7', colorClass: 'badge-grey' },
      { label: 'Cancelled', value: '0', colorClass: 'badge-red' },
      { label: 'Arrived', value: '1', colorClass: 'badge-green' },
      { label: 'Checked In', value: '2', colorClass: 'badge-sky'},
      { label: 'Fullfilled', value:'1', colorClass:'badge-lightgreen'},
      { label: 'Pending', value:'1', colorClass:'badge-purple'},
      { label: 'Waitlisted', value:'0', colorClass:'badge-orange'}
    ];
  
    infoData = [
      { label: 'Name', value: 'Abdul Razak' },
      { label: 'Token No', value: '54' },
      { label: 'Id', value: '4673' },
      { label: 'OP No', value: '4673-vc' },
      { label: 'Doctor name', value: 'Alexxy'},
      { label: 'Department', value: 'Ortho'}
    ];
    infoSectionTwo = [
      { label: 'Name', value: 'Angelica' },
      { label: 'Token No', value: '74' },
      { label: 'Id', value: '2321' },
      { label: 'OP No', value: '4545-vc' },
      { label: 'Doctor name', value: 'Alexxy'},
      { label: 'Department', value: 'Ortho'}
    ];
    
  
    ngOnInit() {
      this.categories.forEach((category, catIndex) => {
        for (let r = 0; r < this.rowsPerCategory; r++) {
          this.tableData.push({
            category: category,
            showCategory: r === 0,
            categoryClass: this.categoryColors[catIndex], // assign class per category
            values: Array.from({ length: 12 }, (_, i) => 
              `C${catIndex+1}R${r+1}C${i+1}`
            )
          }); 
        }
      });
    }

    selectedIndex: number = 0;

selectTab(index: number) {
  this.selectedIndex = index;
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


  tableHeads = [
    'Token', 'Visit Time', 'Patient #', 'Patient Name', '....',
    'Vitals', 'Sex/Age', 'Allergy', 'Comments', 'Insurance', 'Over', 'Call'
  ];




    async getAllccTabs() {
    (await this.authser.getAllcctabs()).subscribe((data: any) => {
      console.log(data);

      // Correct sorting using taB_ORDER
      const tabs = data.sort((a: Tabs, b: Tabs) =>
        Number(a.taB_ORDER ?? 0) - Number(b.taB_ORDER ?? 0)
      );

      this.AllbmTabs = tabs;
      this.TabsList1 = tabs.slice(0, 5);
      this.TabsList2 = tabs.slice(5);

      console.log(this.AllbmTabs, this.TabsList1, this.TabsList2);

      // this.HeaderNameSet()
    });
  }
}