import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonItem, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { CommonService } from 'src/app/shared/services/common.service';
import { DialogService } from 'src/app/shared/services/notification/dialog.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
// import { CommonService } from 'src/services/common.service';
// import { CommonService } from 'src/services/common.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-enter-url',
  templateUrl: './enter-url.page.html',
  styleUrls: ['./enter-url.page.scss'],
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class EnterUrlPage implements OnInit,OnDestroy {

  Url:string=''
  ur:string='http://'
  CompleteUrl:string=''
 
  storedUrl: string | null =null;

  constructor(
    private comser:CommonService,
    private router:Router,
    private dialogService:DialogService,
    private notification:NotificationService
  
  ) {
    // this.CheckEmployeeAlreadyLogined()
    // this.AddUrl
   }

  ngOnInit() {
    console.log();
    
  }

  AddUrl() {
    // AddUrl() {
  console.log('Protocol:', this.ur);
  console.log('URL:', this.Url);
// }

    console.log(this.Url);
    
    if (this.Url && this.comser.isUrlOrIp(this.Url)) {
      let compurl = this.ur+this.Url
      this.CompleteUrl = compurl
      localStorage.setItem('op_api_web_url', compurl);
      this.router.navigate(['login'])
      // reload()
    } else {
      // Swal.fire(
      //   this.CompleteUrl ? 'Enter a Valid Url or IP' : 'Please enter a valid URL to confirm',
      //   '',
      //   'warning'
      // );
      this.notification.showNotification('Enter a Valid Url or IP','warning')
    }
  }


 
  // checkUrlInLocalStorage() {
  //   if(localStorage.getItem('remedi_ep_url'))
  //   {

  //     this.storedUrl = localStorage.getItem('remedi_ep_url'); 
  //   }// Check if there's a URL in localStorage
  
  //   if (this.storedUrl) {
  //     // If URL exists in localStorage, prompt the user
  //     Swal.fire({
  //       title: 'Stored URL Found',
  //       text: `Do you want to continue with the saved URL (${this.storedUrl}) or change it?`,
  //       icon: 'question',
  //       showCancelButton: true,
  //       confirmButtonText: 'Continue',
  //       cancelButtonText: 'Change URL',
  //       backdrop:false
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         // Safely call continueWithUrl with a non-null string
  //         this.continueWithUrl(this.storedUrl); 
  //       } else {
  //         // If user chooses to change, prompt to enter a new URL
  //         // this.promptForNewUrl();
  //         // this.CompleteUrl = (this.storedUrl)?.toString()
  //         if(this.storedUrl!=null)
  //         {
  //           this.Url=this.extractIPWithPort(this.storedUrl)
            
  //           let ur = (this.extractProtocol(this.storedUrl)==null?'http://':this.extractProtocol(this.storedUrl)+'://')
  //           // if(ur!=null)
  //           // {
  //             this.ur = ur

  //           // }


  //         }
  //       }
  //     });
  //   }else
  //   {

  //   }
  // }


   async checkUrlInLocalStorage() {
    this.storedUrl = localStorage.getItem('op_api_web_url');
    // console.log(this.storedUrl);
   if(localStorage.getItem('op_api_web_url'))
    {

      this.storedUrl = localStorage.getItem('op_api_web_url'); 
    }


    if (this.storedUrl) {
      this.Url = this.storedUrl
      const alert = await this.dialogService.showAlert({
        header: 'Stored URL Found',
        message: `Do you want to continue with the saved URL (${this.storedUrl}) or change it?`,
        buttons: [
          {
            text: 'Change URL',
            role: 'cancel',
            handler: () => {
              // let the user edit
              this.Url = this.storedUrl?.toString()??'';
            },
          },
          {
            text: 'Continue',
            handler: async () => {
              this.continueWithUrl(); // safe non-null
             
            },
          },
        ],
        backdropDismiss: false,
      });
    }
  }

  extractProtocol(url: string): string | null {
    const match = url.match(/^(https?):\/\//);
    return match ? match[1] : null;
}


extractIPWithPort(url: string): string | null {
    const match = url.match(/((?:\d{1,3}\.){3}\d{1,3}|\blocalhost\b|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(:\d+)?/);
    return match ? match[0] : null;
}

  continueWithUrl() {
    // console.log(`Continuing with the URL: ${url}`);
    // Proceed with the stored URL (implement as needed)
    this.router.navigate(['login'])
    
  }

 


  CheckEmployeeAlreadyLogined(){
    if(localStorage.getItem('user'))
    {
      this.router.navigate(['home/dashboard'])
      
    }
    else
    {
      
    this.checkUrlInLocalStorage()
    }
    
  }




  ngOnDestroy(){
    window.location.reload()
  }

 


}
