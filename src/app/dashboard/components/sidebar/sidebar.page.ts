import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Tabs } from 'src/app/shared/interfaces/tabs';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { clipboardOutline, gridOutline } from 'ionicons/icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, FormsModule]
})
export class SidebarPage implements OnInit {


  TabsList1: Tabs[] = []
  TabsList2: Tabs[] = []
  AllTabs: Tabs[] = []
  AllbmTabs: Tabs[] = []

  constructor(
    private authser: AuthService,
    private router: Router
  ) { 
    addIcons({ gridOutline,clipboardOutline, });
  }

  ngOnInit() {
    this.getAllccTabs()
  }



  @Input() isCollapsed: boolean = false;

  openMenu: string | null = null;

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }


  listItems = [
    { label: 'Booked', value: '1', colorClass: 'badge-blue' },
    { label: 'Confirmed', value: '7', colorClass: 'badge-grey' },
    { label: 'Cancelled', value: '0', colorClass: 'badge-red' },
    { label: 'Arrived', value: '1', colorClass: 'badge-green' },
    { label: 'Checked In', value: '2', colorClass: 'badge-sky' },
    { label: 'Fullfilled', value: '1', colorClass: 'badge-lightgreen' },
    { label: 'Pending', value: '1', colorClass: 'badge-purple' },
    { label: 'Waitlisted', value: '0', colorClass: 'badge-orange' }
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


  navigateTo(route: string) {
    if (!route) return;

    // remove leading slash if backend sends it
    const cleanRoute = route.replace(/^\/+/g, '');

    console.log('Navigating to:', `/dashboard/${cleanRoute}`);

    this.router.navigate(['/dashboard', ...cleanRoute.split('/')]);
    // this.onMenuClick();
  }
}
