import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonBadge, IonButton, IonButtons, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPopover, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline, menuOutline, personOutline, settingsOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/shared/services/auth.service';
// import { IonPopover } from '@ionic/angular/common';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.page.html',
  styleUrls: ['./dashboard-header.page.scss'],
  standalone: true,
  imports: [IonHeader, IonButton, IonButtons, IonBadge, IonToolbar, CommonModule, FormsModule, IonIcon, IonLabel, IonList, IonItem, IonAvatar, IonPopover]
})
export class DashboardHeaderPage implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();
  
  isCollapsed: boolean = false;
  constructor(private authservice: AuthService) { 
    addIcons({settingsOutline, personOutline,logOutOutline,menuOutline});
  }

  ngOnInit() {
  }


  
  toggleSidebara() {
    this.isCollapsed = !this.isCollapsed;
  }


  logout() {
    // Implement logout logic here, e.g., clear user session, redirect to login page, etc.
    console.log('Logout clicked');
    this.authservice.Logoutfn();
  }
}
