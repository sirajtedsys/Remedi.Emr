import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  IonContent,
  IonButton,
  IonIcon,
  IonSelectOption,
  IonSelect
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import {
  eyeOutline,
  eyeOffOutline,
  helpCircleOutline,
  reorderThree,
  mailOutline,
  lockClosedOutline,
  medicalOutline,
  fitnessOutline,
  settingsOutline,
  menuOutline
} from 'ionicons/icons';
import { ToastService } from '../shared/services/notification/toast.service';
import { AppConfig } from '../shared/class/app-config';
import { LookUp } from '../shared/interfaces/lookup/lookup';
import { AuthService } from '../shared/services/auth.service';
import { NotificationService } from '../shared/services/notification/notification.service';
import { TokenService } from '../shared/services/token.service';
import { Login } from '../shared/class/Login';
import { firstValueFrom } from 'rxjs';
import { PatientlistService } from '../shared/services/patientlist.service';
import { EmployeePageSettings } from '../shared/interfaces/employee-page-settings';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonSelectOption,
    IonSelect,
    ReactiveFormsModule

  ]
})
export class LoginPage {

  // Password visibility toggle
  showPassword = false;

  // Loading state (for future API integration)
  isLoading = false;





  roles = [
    { label: 'Doctor', value: 'doctor', icon: 'medical-outline' },
    { label: 'Nurse', value: 'nurse', icon: 'fitness-outline' },
    { label: 'Admin', value: 'admin', icon: 'settings-outline' }
  ];

  selectedRole: string | null = null;

  // Add this method
  selectRole(role: string) {
    this.selectedRole = role;
  }





  appconfig = new AppConfig()

  Username: string = ''
  Password: string = ''
  Section: number = 0
  // SectionList: Lookup[] = []
  ShowBranch: boolean = false

  loginForm: FormGroup;

  LevelInLogin: boolean = false;
  SectionList: LookUp[] = [];
  SectionListDup: LookUp[] = [];
  SelectedSection: string = ''
  SectionSearchText: string = ''

  constructor(private fb: FormBuilder, private router: Router, private authser: AuthService,
    private tokenService: TokenService, private toast: ToastService, private patientListSer: PatientlistService,
    private notificationService: NotificationService) {

    // this.HideContactNo()
    addIcons({ helpCircleOutline, 'eyeOutline': eyeOutline, 'eyeOffOutline': eyeOffOutline, reorderThree, mailOutline, lockClosedOutline, medicalOutline, fitnessOutline, settingsOutline, menuOutline });

    // this.loginForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required]
    // });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,]],
      password: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.autoLogin()
  }

  // async HideContactNo() {

  //   (await this.patientListSer.HideContactNo()).subscribe(
  //     (data: any) => {
  //       console.log(data); // Inspect structure

  //       this.LevelInLogin = Boolean(data.levelInLogin)
  //       console.log(this.LevelInLogin);
  //       if (this.LevelInLogin) {
  //         this.getAllLevels()
  //       }

  //     },
  //     (error: any) => {
  //       console.error('Error fetching patient summary:', error);
  //     }
  //   );
  // }

  // onLogin() {
  //   if (this.loginForm.valid) {
  //     console.log('Login data:', this.loginForm.value);
  //     this.router.navigate(['/home']);
  //   } else {
  //     console.log('Invalid form');
  //   }
  // }
  async onLogin() {
    console.log(this.SelectedSection);

    const log = new Login();
    log.Username = this.loginForm.get('email')?.value ?? '';
    log.Password = this.loginForm.get('password')?.value ?? '';

    // ✅ CASE 1: Section already selected
    if (this.SelectedSection !== '') {
      log.SectionId = this.SelectedSection;
    }
    // ✅ CASE 2: Section NOT selected → fetch sections
    else {
      await this.getSectionsOfUser(log);

      // ✅ Auto-pick section if only ONE exists
      if (this.SectionList?.length === 1) {
        log.SectionId = this.SectionList[0].id ?? '';
        this.SelectedSection = this.SectionList[0].id ?? '';
        // this.onLogin()
      }
      // ❌ Multiple sections → stop login
      else {
        this.notificationService.showNotification(
          'Please select a section',
          'warning'
        );
        return;
      }
    }

    // 🔥 LOGIN API should run ONLY after LevelId is set
    try {
      const data: any = await firstValueFrom(
        await this.authser.loginCheck(log)
      );

      console.log(data);

      if (data?.status === 'success' && data?.token) {
        await this.tokenService.setToken(data.token);
        // this.router.navigate(['/dashboard']);
        this.getUserDashboardpage()
      } else {
        this.notificationService.showNotification(
          data?.message || 'Invalid login',
          'warning'
        );
      }
    } catch (error) {
      console.error(error);
      this.notificationService.showNotification(
        'Login failed, please check your credentials',
        'error'
      );
    }
  }



  async getSectionsOfUser(log: Login): Promise<void> {
    try {
      const data: any = await firstValueFrom(
        await this.authser.getSectionOfUser(log)
      );

      console.log(data);

      if (data?.status === 'error') {
        this.notificationService.showNotification(
          data?.message || 'Invalid login',
          'warning'
        );
      } else {
        this.SectionList = data;
        this.SectionListDup = data;
      }

    } catch (error) {
      console.error(error);
      this.notificationService.showNotification(
        'Login failed, please check your credentials',
        'error'
      );
    }
  }


  onForgotPassword() {
    console.log('Forgot Password clicked');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  ChangeConfig() {
    this.router.navigate(['config'])
  }

  checkEnvType() {
    return this.appconfig.EnvType == 'mobile'
  }


  filterUsers() {
    // console.log(this.srd);

    this.SectionList = this.SectionListDup.filter(x =>
      x.name?.toLowerCase().includes(this.SectionSearchText.toLowerCase())
    );
  }


  async autoLogin() {
    (await this.authser.GetAllTokenClaims()).subscribe((data: any) => {
      console.log(data);
      // return
      if (data?.userName) {

        // this.router.navigate(['/dashboard']);
        this.getUserDashboardpage()
      }
    })
  }



  async getUserDashboardpage() {
    await (await this.patientListSer.GetEmployeePageSettings()).subscribe((data: EmployeePageSettings) => {
      console.log(data);
      if (!data||  data.logiN_PAGE_LINK == null || data.logiN_PAGE_LINK == '') {
        this.router.navigate(['/dashboard/patient-list/0']);
      }
      else {


        // this.UserDashboardpage = data
        this.router.navigate(['/dashboard/' + data.logiN_PAGE_LINK]);
      }
    })
  }
}




