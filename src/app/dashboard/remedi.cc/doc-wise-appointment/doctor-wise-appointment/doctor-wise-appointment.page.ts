import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonSelect,
  IonSelectOption,
  Platform,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { LookUp } from 'src/app/shared/interfaces/lookup/lookup';
import { DoctorListDto } from 'src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/doctor-list-dto';
import { DoctorBookingCount } from 'src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/doc-booking-count';
import { DoctorScheduleInfo } from 'src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/doc-schedule-info';
import { CalendarDay } from 'src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/calender-day';
import { DocWiseAppointmentService } from 'src/app/shared/services/remedi.cc/doc-wise-appointment.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';


@Component({
  selector: 'app-doctor-wise-appointment',
  templateUrl: './doctor-wise-appointment.page.html',
  styleUrls: ['./doctor-wise-appointment.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonIcon,
    IonItem,
    IonLabel,
    IonSelectOption,
    IonSelect,
    IonCol,
    IonRow,
    IonGrid,
    IonCardContent,
    IonCard,
    IonNote,
    IonBadge
],
})
export class DoctorWiseAppointmentPage implements OnInit {
  DepartmentList: LookUp[] = []
  DoctorList: DoctorListDto[] = []
  BranchList: LookUp[] = []
  yearsList: LookUp[] = []
  Today: any
  monthList: LookUp[] = []

  LoginedAsDoctor: boolean = false

  // selectedDocotedBookedData()

  // -----------------------------
  // FILTERS
  // -----------------------------
  selectedDepartment: number = 0;
  selectedDoctor: string = '';
  selectedBranch: string = ''
  selectedYear: number = 0
  selectedYearId: string = ''
  selectedMonthId: string = ''

  currentYear: any
  currentMonthId: any
  maxYear: any
  // selectedMonth:string=''

  DoctorBookingCountList: DoctorBookingCount[] = []
  DoctorScheduleInfoList: DoctorScheduleInfo[] = []


  startWeekDay = 0;   // ✅ ADD THIS

  // selectedYear = 2026;
  selectedMonthIndex = new Date().getMonth(); // 0–11

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  calendarDays: CalendarDay[] = [];

  isWebCalendar = true;

  constructor(
    private platform: Platform,
    private dwaService: DocWiseAppointmentService,
    private datePipe: DatePipe,
    private comSer: CommonService,
    private router: Router,
    private notification: NotificationService,
    private sharedData: SharedDataService
  ) {
    addIcons({ chevronForwardOutline, chevronBackOutline, });
    this.Today = this.datePipe.transform(new Date())
    console.log(this.Today);
    this.currentYear = new Date().getFullYear();
    this.currentMonthId = (new Date().getMonth() + 1).toString().padStart(2, '0');

    this.maxYear = this.currentYear + 10;


  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const width = window.innerWidth;
    // Standard breakpoint for tablets/laptops
    this.isWebCalendar = width >= 768;
  }

  async ngOnInit() {

    this.checkScreenSize();
    this.getYearsBetweenNowAnd10Years();

    await Promise.all([
      this.getAllBranches(),
      this.getDoctorBookingCounts(),
      this.getDoctorLeaves()
    ]);

    this.generateCalendar();

    // 🔥 RUN ONLY AFTER ALL ABOVE FINISHED
    this.checkLoginedByDoctor();
  }


  checkLoginedByDoctor() {
    const data = this.sharedData.DoctorId$.subscribe((data: any) => {

      console.log(data);
      console.log(this.selectedBranch);


      if (data != '') {
        this.LoginedAsDoctor = true
        this.selectedDoctor = data

        this.getDoctorBookingCounts();
        this.GetDoctorScheduleTokensAsync()

      }
    });

    // Use 'data' as needed
  }

  detectLayout() {
    if (this.platform.is('desktop')) {
      this.isWebCalendar = true;
      return;
    }

    if (this.platform.is('android') || this.platform.is('ios')) {
      this.isWebCalendar = false;
      return;
    }

    // fallback
    this.isWebCalendar = window.innerWidth >= 768;
  }

  // -----------------------------
  // CALENDAR GENERATION
  // -----------------------------
  // generateCalendar() {
  //   this.calendarDays = [];

  //   const firstDay = new Date(this.selectedYear, this.selectedMonthIndex, 1);
  //   const lastDay = new Date(this.selectedYear, this.selectedMonthIndex + 1, 0);

  //   const startWeekDay = firstDay.getDay(); // Sunday = 0
  //   const totalDays = lastDay.getDate();

  //   // Empty cells before month start (WEB grid alignment)
  //   for (let i = 0; i < startWeekDay; i++) {
  //     this.calendarDays.push({ date: null });
  //   }

  //   // Actual dates
  //   for (let day = 1; day <= totalDays; day++) {

  //     const noConsultation = this.isSunday(day);

  //     const total = 42;
  //     const booked = Math.floor(Math.random() * 10);
  //     const available = total - booked;

  //     this.calendarDays.push({
  //       date: day,
  //       fullDate: `${day} ${this.months[this.selectedMonthIndex]} ${this.selectedYear}`,
  //       total,
  //       booked,
  //       available,
  //       noConsultation
  //     });
  //   }
  // }

  generateCalendar() {
    this.calendarDays = [];

    const selectedMonthIndex = Number(this.selectedMonthId) - 1

    const firstDay = new Date(this.selectedYear, selectedMonthIndex, 1);
    const lastDay = new Date(this.selectedYear, selectedMonthIndex + 1, 0);

    // ✅ ASSIGN TO CLASS PROPERTY
    this.startWeekDay = firstDay.getDay();

    const totalDays = lastDay.getDate();

    // Empty cells for calendar alignment
    for (let i = 0; i < this.startWeekDay; i++) {
      this.calendarDays.push({ date: null });
    }
    // console.log(this.scheduleMap,this.bookingMap);


    for (let day = 1; day <= totalDays; day++) {

      const fullDate = `${day}-${selectedMonthIndex + 1}-${this.selectedYear}`;
      const fd = this.comSer.convertToDate(fullDate);
      const date = this.datePipe.transform(fd, 'dd-MM-yyyy');

      const total = this.scheduleMap[`${this.selectedDoctor}_${date}`] ?? 0;
      const booked = this.bookingMap[`${this.selectedDoctor}_${date}`] ?? 0;

      this.calendarDays.push({
        date: day,
        fullDate: fullDate,
        total,
        booked,
        available: total - booked,
        noConsultation: total == 0
      });
    }


    // console.log(this.calendarDays);


  }

  // isSunday(day: number): boolean {
  //   return new Date(
  //     this.selectedYear,
  //     this.selectedMonthIndex,
  //     day
  //   ).getDay() === 0;
  // }

  // -----------------------------
  // HELPERS
  // -----------------------------
  isSunday(day: number): boolean {


    const selectedMonthIndex = Number(this.selectedMonthId) - 1
    const date = new Date(this.selectedYear, selectedMonthIndex, day);
    return date.getDay() === 0;
  }

  // -----------------------------
  // MONTH NAVIGATION
  // -----------------------------
  prevMonth() {

    if (this.isPrevDisabled()) {
      return;
    }



    if (this.selectedMonthId === '01') {
      // Move to previous year
      this.selectedYear--;
      this.selectedYearId = this.selectedYear.toString();

      // Regenerate months for new year
      this.getMonthsByYear(this.selectedYearId);

      // Set last month
      this.selectedMonthId = '12';
    } else {
      const prev = this.moveToPreviousById(this.monthList, this.selectedMonthId);
      if (prev) {
        this.selectedMonthId = prev.id ?? '';
      }
    }

    if (this.selectedDoctor) {

      this.GetDoctorScheduleTokensAsync()
    }

    this.generateCalendar();
  }


  nextMonth() {

    if (this.isNextDisabled()) {
      return;
    }
    if (this.selectedMonthId === '12') {
      // Move to next year
      this.selectedYear++;
      this.selectedYearId = this.selectedYear.toString();

      // Regenerate months for new year
      this.getMonthsByYear(this.selectedYearId);

      // Set first month
      this.selectedMonthId = '01';
    } else {
      const next = this.moveToNextById(this.monthList, this.selectedMonthId);
      if (next) {
        this.selectedMonthId = next.id ?? '';
      }
    }

    if (this.selectedDoctor) {

      this.GetDoctorScheduleTokensAsync()
    }

    this.generateCalendar();
  }


  moveToNextById(list: LookUp[], currentId: string): LookUp | null {
    const currentIndex = list.findIndex(x => x.id === currentId);

    if (currentIndex === -1 || currentIndex === list.length - 1) {
      return null; // no next
    }

    return list[currentIndex + 1];
  }

  moveToPreviousById(list: LookUp[], currentId: string): LookUp | null {
    const currentIndex = list.findIndex(x => x.id === currentId);

    if (currentIndex <= 0) {
      return null; // no previous
    }

    return list[currentIndex - 1];
  }


  isPrevDisabled(): boolean {
    return (
      this.selectedYear === this.currentYear &&
      this.selectedMonthId === this.currentMonthId
    );
  }

  isNextDisabled(): boolean {
    return (
      this.selectedYear === this.maxYear &&
      this.selectedMonthId === '12'
    );
  }




  // -----------------------------
  // FILTER EVENTS
  // -----------------------------
  onBranchChange(event: any) {
    console.log(event);
    this.selectedBranch = event.detail.value
    // this.getAllDoctors(this.selectedDepartment)
    this.getAllDoctors(this.selectedBranch)
    this.getAllDepts(this.selectedBranch)

    this.generateCalendar();

    // this.loadCalendarFromAPI();
  }

  // onYearChange(event: any) {
  //   console.log(event);
  //   // this.selectedDepartment = event.detail.value
  //   // this.getAllDoctors(this.selectedBranch, this.selectedDepartment)

  //   this.selectedYearId = event.detail.value
  //   this.selectedYear = Number(event.detail.value)
  //   this.getMonthsByYear(this.selectedYearId)
  //   this.generateCalendar()

  //   if (this.selectedDoctor) {

  //     this.GetDoctorScheduleTokensAsync()
  //   }

  //   // this.loadCalendarFromAPI();
  // }

  // onMonthChange(event: any) {
  //   console.log(event);
  //   // this.selectedDepartment = event.detail.value
  //   // this.getAllDoctors(this.selectedBranch, this.selectedDepartment)

  //   this.selectedMonthId = event.detail.value
  //   console.log(this.selectedMonthId);


  //   this.generateCalendar()

  //   // this.selectedMonth = this.monthList.filter((x:LookUp)=>x.id==this.selectedMonthId)[0].name??''

  //   // this.loadCalendarFromAPI();
  //   if (this.selectedDoctor) {

  //     this.GetDoctorScheduleTokensAsync()
  //   }
  // }

  onYearChange(event: any) {
    this.selectedYearId = event.detail.value;
    this.selectedYear = Number(event.detail.value);

    this.getMonthsByYear(this.selectedYearId);
    this.generateCalendar();

    if (this.selectedDoctor) {
      this.getDoctorBookingCounts();
      this.GetDoctorScheduleTokensAsync();
    }
  }

  onMonthChange(event: any) {
    this.selectedMonthId = event.detail.value;
    this.generateCalendar();

    if (this.selectedDoctor) {
      this.getDoctorBookingCounts();
      this.GetDoctorScheduleTokensAsync();
    }
  }



  onDepartmentChange(event: any) {
    console.log(event);
    this.selectedDepartment = event.detail.value
    this.getAllDoctors(this.selectedBranch, this.selectedDepartment)
    this.generateCalendar();

    // this.loadCalendarFromAPI();
  }

  onDoctorChange(event: any) {
    // this.loadCalendarFromAPI();
    console.log(event);
    this.selectedDoctor = event.detail.value

    this.getDoctorBookingCounts();
    this.GetDoctorScheduleTokensAsync()
    // this.generateCalendar();
    // this.getAllDoctors(this.selectedDepartment)
    // this.
  }

  onMonthYearChange() {
    this.generateCalendar();
    // this.loadCalendarFromAPI();
  }


  getSelectedMonth(): string {
    return this.monthList.filter((x: LookUp) => x.id == this.selectedMonthId)[0].name ?? ''
  }

  // -----------------------------
  // API PLACEHOLDER
  // -----------------------------
  loadCalendarFromAPI() {
    /*
      Example payload:
      {
        departmentId,
        doctorId,
        month,
        year
      }
    */

    // 🔌 Replace with real API call
    console.log('Loading calendar for:',
      this.selectedDepartment,
      this.selectedDoctor,
      this.months[this.selectedMonthIndex],
      this.selectedYear
    );
  }



  async getAllDoctors(branchId: string, departmentId: number = 0) {
    (await this.dwaService.GetOnlineAppointmentDoctorsAsync(departmentId, branchId)).subscribe((data: any) => {
      console.log(data);
      this.DoctorList = data
      // console.log(
      //   this.DoctorList
      //     .map((x: DoctorListDto) => `'${x.employee_Id}'`)
      //     .join(',')
      // );

      this.generateCalendar();

    })
  }

  async getAllDepts(branchId: string) {
    (await this.dwaService.GetDepartmentsForOnlineAppointmentAsync(branchId)).subscribe((data: any) => {
      console.log(data);
      this.DepartmentList = data
    })
  }

  async getAllBranches(): Promise<void> {
    return new Promise(async (resolve) => {
      (await this.dwaService.GetBranchesByEmployeeIdAsync()).subscribe((data: any) => {
        console.log(data);
        this.BranchList = data
        if (this.BranchList.length == 1) {
          this.selectedBranch = this.BranchList[0].id ?? ''
          this.getAllDoctors(this.selectedBranch)
          this.getAllDepts(this.selectedBranch)
        }
        
      resolve();
      })

    })
  }

  getYearsBetweenNowAnd10Years() {
    // const years: number[] = [];
    this.yearsList = []

    const currentYear = new Date().getFullYear();

    this.selectedYearId = currentYear.toString()
    this.selectedYear = currentYear

    this.getMonthsByYear(this.selectedYearId)
    const endYear = currentYear + 10;

    for (let year = currentYear; year <= endYear; year++) {
      // console.log(year);

      // years.push(year);
      let yearMap: LookUp = { id: '', name: '' };
      // console.log(yearMap);

      yearMap.id = year.toString()
      yearMap.name = year.toString()

      this.yearsList.push(yearMap)

    }


    // return years;
  }

  getMonthsByYear(selectedYearId: string) {
    this.monthList = [];

    const selectedYear = Number(selectedYearId);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // 1–12
    console.log(currentMonth);

    if (!this.selectedMonthId) {
      this.selectedMonthId = currentMonth.toString().padStart(2, '0');
    }

    // this.selectedMonthId = currentMonth.toString().padStart(2, '0');

    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    const startMonth =
      selectedYear === currentYear ? currentMonth : 1;
    //  this.selectedMonth = monthNames[startMonth-1]

    for (let month = startMonth; month <= 12; month++) {
      let monthMap: LookUp = { id: '', name: '' };


      monthMap.id = month.toString().padStart(2, '0'); // ✅ 01–12       // 1–12
      monthMap.name = monthNames[month - 1];       // January, etc.

      this.monthList.push(monthMap);
    }
    console.log(this.monthList);

  }


  async getDoctorLeaves() {
    (await this.dwaService.GetDoctorLeaveCountByMonthAsync(Number(this.selectedMonthId), this.selectedYear)).subscribe((data: any) => {
      console.log(data);

    })
  }

  // async getDoctorBookingCounts() {
  //   (await this.dwaService.GetDoctorBookingCountByMonthAsync(Number(this.selectedMonthId), this.selectedYear)).subscribe((data: any) => {
  //     console.log(data);
  //     this.DoctorBookingCountList = data


  //   })
  // }

  // 🔥 FAST LOOKUP MAPS
  bookingMap: any = {};
  scheduleMap: any = {};

  async getDoctorBookingCounts() {
    (await this.dwaService
      .GetDoctorBookingCountByMonthAsync(Number(this.selectedMonthId), this.selectedYear))
      .subscribe((data: any) => {
        console.log(data);

        this.DoctorBookingCountList = data;
        this.bookingMap = {};

        data.forEach((x: DoctorBookingCount) => {
          const date = this.datePipe.transform(x.bk_Visit_Date, 'dd-MM-yyyy');
          this.bookingMap[`${x.doct_Id}_${date}`] = x.booked;
        });
        console.log(this.bookingMap);


        this.generateCalendar();
      });
  }


  // async GetDoctorScheduleTokensAsync() {
  //   (await this.dwaService.GetDoctorScheduleTokensAsync(this.selectedDoctor, this.selectedBranch, Number(this.selectedMonthId), this.selectedYear)).subscribe((data: any) => {
  //     console.log(data);
  //     this.DoctorScheduleInfoList = data

  //   })
  // }

  async GetDoctorScheduleTokensAsync() {
    (await this.dwaService
      .GetDoctorScheduleTokensAsync(this.selectedDoctor, this.selectedBranch, Number(this.selectedMonthId), this.selectedYear))
      .subscribe((data: any) => {
        console.log(data);

        this.DoctorScheduleInfoList = data;
        this.scheduleMap = {};

        data.forEach((x: DoctorScheduleInfo) => {
          const date = this.datePipe.transform(x.schedule_Day, 'dd-MM-yyyy');
          this.scheduleMap[`${x.doct_Id}_${date}`] = x.token;
        });

        console.log(this.scheduleMap);
        this.generateCalendar();

      });
  }

  getSelectedDoctorBookedCount(day: any) {
    if (!day?.fullDate || !this.selectedDoctor) return 0;
    console.log(day.fullDate);
    

    const date = this.datePipe.transform(
      this.comSer.convertToDate(day.fullDate),
      'dd-MM-yyyy'
    );

    return this.bookingMap[`${this.selectedDoctor}_${date}`] ?? 0;
  }




  // getSelectedDoctorBookedCount(day: any) {
  //   if (day != null) {
  //     let date = this.datePipe.transform(this.comSer.convertToDate(day.fullDate), 'dd-MM-yyyy')
  //     return this.DoctorBookingCountList.find((x: any) => this.datePipe.transform(x.bk_Visit_Date, 'dd-MM-yyyy') == date && x.doct_Id == this.selectedDoctor)?.booked ?? 0

  //   }
  //   return 0
  // }
  getSelectedDoctorTotal(day: any) {

  if (!day?.fullDate || !this.selectedDoctor) return 0;

  const converted = this.comSer.convertToDate(day.fullDate);

  if (!converted || isNaN(converted.getTime())) {
    console.warn('Invalid date:', day.fullDate);
    return 0;
  }

  const date = this.datePipe.transform(converted, 'dd-MM-yyyy');

  return this.scheduleMap[`${this.selectedDoctor}_${date}`] ?? 0;
}


  // getSelectedDoctorTotal(day: any) {
  //   if (!day?.fullDate || !this.selectedDoctor) return 0;
  // console.log( new Date(day.fullDate));

  //   const date = this.datePipe.transform(
  //     this.comSer.convertToDate(day.fullDate),
  //     'dd-MM-yyyy'
  //   );

  //   return this.scheduleMap[`${this.selectedDoctor}_${date}`] ?? 0;
  // }



  getAvailable(total: number, booked: number) {
    return (total || 0) - (booked || 0);
  }



  onDateClick(day: CalendarDay) {
    if (day.noConsultation) {
      this.notification.showNotification('No consultation on this day', 'warning')
      return
    }
    console.log(day);
    console.log(this.DoctorList);
    

    day.DoctId = this.selectedDoctor
    day.DoctName = this.DoctorList.find((x: DoctorListDto) => x.doct_Id == this.selectedDoctor)?.emp_Offl_Name ?? ''
    day.total = this.getSelectedDoctorTotal(day)
    day.booked = this.getSelectedDoctorBookedCount(day)
    day.available = this.getAvailable(this.getSelectedDoctorTotal(day), this.getSelectedDoctorBookedCount(day))
    day.fullDate = this.comSer.convertToDate(day.fullDate ?? '').toString()
    day.BranchId = this.selectedBranch
    day.empId = this.DoctorList.find((x: DoctorListDto) => x.doct_Id == this.selectedDoctor)?.employee_Id ?? ''
    if (this.datePipe &&
      this.datePipe.transform(day.fullDate ?? '', 'dd-MM-yyyy') &&
      this.datePipe.transform(new Date(), 'dd-MM-yyyy') &&
      (this.datePipe.transform(day.fullDate ?? '', 'dd-MM-yyyy')! < this.datePipe.transform(new Date(), 'dd-MM-yyyy')!)
    ) {
      this.notification.showNotification('Cannot book for past dates', 'error')
      return
    }
    console.log(day);
    
    this.router.navigate(['/dashboard/doc-daily-slots'], {
      state: {
        CalenderDay: day
      }
    });

  }



}

