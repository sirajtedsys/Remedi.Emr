import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, chevronBackOutline, chevronForwardOutline, closeCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

import { PatientBookingRegistrationPage } from "../patient-booking-registration/patient-booking-registration.page";
import { AppointmentActionsPage } from "../appointment-actions/appointment-actions.page";
import { CalendarDay } from 'src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/calender-day';
import { ccmoduleConfig } from 'src/app/shared/class/cc-module-config';
import { DoctorScheduleInfo } from 'src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/doc-schedule-info';
import { DoctorTokenList } from 'src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/doc-daily-slot/doc-token-list';
import { Slots } from 'src/app/shared/class/remedi.cc/doc-wise-appointment/doc-daily-slots/slots';
import { DocWiseAppointmentService } from 'src/app/shared/services/remedi.cc/doc-wise-appointment.service';
import { NpaService } from 'src/app/shared/services/remedi.cc/npa.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { firstValueFrom } from 'rxjs';
// import { IonModal } from '@ionic/angular/common';

@Component({
  selector: 'app-doc-daily-slots',
  templateUrl: './doc-daily-slots.page.html',
  styleUrls: ['./doc-daily-slots.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonIcon,
    IonButton,
    IonModal,
    IonButtons,
    // PatientBookingRegistrationPage,
    // AppointmentActionsPage
    PatientBookingRegistrationPage,
    AppointmentActionsPage
],
})
export class DocDailySlotsPage implements OnInit {

  CalenderData!: CalendarDay
  CCmoduleConfig = new ccmoduleConfig()
  ColumnsPerRow: number = 4

  DocScheduleList: DoctorScheduleInfo[] = []
  DoctorTokenList: DoctorTokenList[] = []


  RevisitCount: number = 0
  NewRegCount: number = 0
  BalanceToken: number = 0


  selectedDate = new Date();
  SelectedToken: number = 0

  realSlots: Slots[] = []

  slots = Array.from({ length: 32 }).map((_, i) => ({
    time: this.generateTime(i),
    status: i === 9 ? 'reallocated' : 'revisit',
    patient: i === 9 ? {
      name: 'LEHI ANTONY',
      info: '65 Yrs · Female',
      id: '9946984648'
    } : null
  }));

  slotRows: Slots[][] = [];

  constructor(
    private router: Router,
    private dwaService: DocWiseAppointmentService,
    private npaService: NpaService,
    private commonService: CommonService,
    private datePipe: DatePipe,
    private notification: NotificationService

  ) {

    addIcons({ chevronBackOutline, chevronForwardOutline, closeCircleOutline,arrowBackOutline });

    this.fetchDataFromState()

  }





  ngOnInit(): void {

    this.getCcModuleConfigs()
    this.groupSlots();
  }

  goBack() {
    this.router.navigate(['dashboard/doctor-wise-appointment'])
  }


  async getCcModuleConfigs() {
    (await this.npaService.getCCModuleConfigs()).subscribe((data: any) => {
      console.log(data);
      this.CCmoduleConfig = data
      this.getAllDocDailyPageFns(this.CCmoduleConfig.branchId, this.CalenderData.DoctId ?? '', this.CalenderData.fullDate)


    })
    // console.log(d);

  }




  fetchDataFromState() {
    // Access the navigation state
    // const navigation = window.history.state;
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation);
    
    this.CalenderData = navigation?.extras?.state?.['CalenderDay'];
    console.log(this.CalenderData);
    // this.setPatientDataToService(this.patientData)
    this.selectedDate = new Date(this.CalenderData.fullDate ?? Date.now())
  }



  async getAllDocDailyPageFns(branchId: string, doctorId: string, date: any) {

    date = this.datePipe.transform(date);

    await Promise.all([
      this.GetDoctorScheduleByDateAsync(branchId, doctorId, date),
      this.GetDoctorTokenListAsync(branchId, doctorId, date),
      this.GetDoctorLeaveCountByDateAsync(branchId, doctorId, date),
      this.GetWaitingListBookingCountByDateAsync(branchId, doctorId, date),
      this.GetOnlineDoctorAvailabilityByDateAsync(branchId, doctorId, date),
      this.GetDoctorNonAvailabilityByDateAsync(branchId, doctorId, date)

    ]);


    this.slotCreation()

    this.BalanceToken = ((this.DocScheduleList.length > 0 ? this.DocScheduleList[0].token : 0) || 0) - ((this.RevisitCount ?? 0) + (this.NewRegCount ?? 0))

    // ✅ Runs AFTER all APIs finished
    // this.afterAllApisLoaded();
  }



  async GetDoctorScheduleByDateAsync(branchId: string, doctorId: string, date: any) {
    const data = await firstValueFrom(
      await this.dwaService.GetDoctorScheduleByDateAsync(branchId, doctorId, date)
    );

    console.log(data);
    // this.CCmoduleConfig = data
    this.DocScheduleList = data




    // console.log(d);

  }

  async GetDoctorTokenListAsync(branchId: string, doctorId: string, date: any) {
    const data = await firstValueFrom(
      (await this.dwaService.GetDoctorTokenListAsync(branchId, doctorId, date))
    )
    console.log(data);
    this.DoctorTokenList = data
    // this.CCmoduleConfig = data

    this.RevisitCount = (this.DoctorTokenList.filter((x: DoctorTokenList) => x.bk_New_Reg == "N")).length
    this.NewRegCount = (this.DoctorTokenList.filter((x: DoctorTokenList) => x.bk_New_Reg == "Y")).length

    // this.BalanceToken = this.DocScheduleList[0].token - (this.RevisitCount + this.NewRegCount)


    // console.log(d);

  }
  async GetDoctorLeaveCountByDateAsync(branchId: string, doctorId: string, date: any) {
    const data = await firstValueFrom(
      (await this.dwaService.GetDoctorLeaveCountByDateAsync(branchId, doctorId, date))
    )
    console.log(data);
    // this.CCmoduleConfig = data

    // console.log(d);

  }
  async GetWaitingListBookingCountByDateAsync(branchId: string, doctorId: string, date: any) {
    const data = await firstValueFrom(
      (await this.dwaService.GetWaitingListBookingCountByDateAsync(branchId, doctorId, date)))
    console.log(data);
    // this.CCmoduleConfig = data

    // console.log(d);

  }
  async GetOnlineDoctorAvailabilityByDateAsync(branchId: string, doctorId: string, date: any) {
    const data = await firstValueFrom(
      (await this.dwaService.GetOnlineDoctorAvailabilityByDateAsync(branchId, doctorId, date)))
    console.log(data);
    // this.CCmoduleConfig = data

    // console.log(d);

  }
  async GetDoctorNonAvailabilityByDateAsync(branchId: string, doctorId: string, date: any) {
    const data = await firstValueFrom(
      (await this.dwaService.GetDoctorNonAvailabilityByDateAsync(branchId, doctorId, date)))
    console.log(data);
    // this.CCmoduleConfig = data

    // console.log(d);

  }



  slotCreation() {

    this.realSlots = []; // reset
    this.slotRows = []

    const sched = this.DocScheduleList?.[0];
    if (!sched) return;

    const visitDuration = sched.visit_Duration;

    // ✅ build token map once (fast lookup)
    const tokenMap = new Map(
      this.DoctorTokenList.map((t: DoctorTokenList) => [t.bk_Token_No, t])
    );

    let tokenCounter = 0;

    const buildSession = (start: any, end: any): Slots[] => {
      if (!start || !end) return [];

      return this.generateTimeSlots(start, end, visitDuration, tokenMap, () => ++tokenCounter);
    };

    const s1 = buildSession(sched.token_Sess_1_Start_Time, sched.token_Sess_1_End_Time);
    const s2 = buildSession(sched.token_Sess_2_Start_Time, sched.token_Sess_2_End_Time);
    const s3 = buildSession(sched.token_Sess_3_Start_Time, sched.token_Sess_3_End_Time);

    // ✅ push session 1
    this.realSlots.push(...s1);

    // ✅ break between s1 → s2
    if (s2.length) {
      this.realSlots.push(this.makeBreakSlot(
        sched.token_Sess_1_End_Time,
        sched.token_Sess_2_Start_Time
      ));
      this.realSlots.push(...s2);
    }

    // ✅ break between s2 → s3
    if (s3.length) {
      this.realSlots.push(this.makeBreakSlot(
        sched.token_Sess_2_End_Time,
        sched.token_Sess_3_Start_Time
      ));
      this.realSlots.push(...s3);
    }

    console.log(this.realSlots);
    // this.groupSlots()
    this.realSlots = this.mergeContinuousTokens(this.realSlots);
    this.groupSlots()

  }


  makeBreakSlot(end: any, start: any): Slots {
    const e = this.datePipe.transform(end, 'hh:mm a');
    const s = this.datePipe.transform(start, 'hh:mm a');

    return {
      slot: `${e} - ${s}`,
      breakSlot: true
    } as Slots;
  }


  generateTimeSlots(
    start: string | Date,
    end: string | Date,
    durationMin: number,
    tokenMap: Map<string, DoctorTokenList>,
    nextTokenNo: () => number
  ): Slots[] {

    const result: Slots[] = [];

    let current = new Date(start);
    const endDate = new Date(end);

    while (current < endDate) {   // ✅ IMPORTANT CHANGE

      const formatted = current.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const tokenNo = nextTokenNo().toString();
      const token = tokenMap.get(tokenNo);

      result.push({
        slot: formatted,
        breakSlot: false,
        tokenDetils: token,
        tokenNo: Number(tokenNo),
        tokenRange: '',
        merged: false
      });

      current = new Date(current.getTime() + durationMin * 60000);
    }

    return result;
  }


  mergeContinuousTokens(slots: Slots[]): Slots[] {

    const merged: Slots[] = [];

    for (let i = 0; i < slots.length; i++) {

      const current = slots[i];
      // console.log(current, 'curernt');


      // skip break slots
      if (current.breakSlot || !current.tokenDetils) {
        merged.push(current);
        continue;
      }

      let startSlot = current;
      let endSlot = current;

      // check next slots
      let j = i + 1;

      while (j < slots.length) {

        const next = slots[j];
        // console.log(next);


        if (
          next.breakSlot ||
          !next.tokenDetils ||
          !startSlot.tokenDetils
        ) break;

        // console.log(startSlot);

        const samePatient =
          next.tokenDetils.bk_Pat_Name === startSlot.tokenDetils.bk_Pat_Name;

        // console.log(samePatient);

        const continuousToken =
          next.tokenNo === endSlot.tokenNo + 1;
        // console.log(continuousToken);


        if (samePatient && continuousToken) {
          endSlot = next;
          j++;
        } else {
          break;
        }
      }
      // console.log(startSlot, endSlot);


      // merged slot
      if (startSlot !== endSlot) {

        merged.push({
          ...startSlot,
          slot: `${startSlot.slot} - ${endSlot.slot}`, // time range
          tokenRange: `${startSlot.tokenNo}-${endSlot.tokenNo}`,
          merged: true
        });

        i = j - 1; // skip merged ones
      }
      else {
        merged.push(startSlot);
      }
    }

    // console.log(merged, 'merged');

    return merged;
  }









  // generateTimeSlots(start: string | Date, end: string | Date, durationMin: number): Slots[] {
  //   const result: Slots[] = [];
  //   let loopNo =0

  //   let current = new Date(start);
  //   const endDate = new Date(end);

  //   while (current <= endDate) {
  //     const formatted = current.toLocaleTimeString([], {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       hour12: true
  //     });
  //     loopNo++
  //     let token  = this.DoctorTokenList.find((x:DoctorTokenList)=>x.bk_Token_No == (loopNo).toString())

  //     result.push({ slot: formatted, breakSlot: false,tokenDetils:token } as Slots);

  //     current = new Date(current.getTime() + durationMin * 60000);
  //   }

  //   return result;
  // }









  generateTime(i: number): string {
    const d = new Date();
    d.setHours(9, i * 5, 0);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Inside DocDailySlotsPage class
  generateSlots() {
    const totalSlots = 32;
    this.slots = Array.from({ length: totalSlots }).map((_, i) => ({
      index: i + 1,
      time: this.generateTime(i),
      status: i === 0 ? 'new' : (i === 9 ? 'reallocated' : 'revisit'),
      patient: i === 9 ? {
        name: 'LENI ANTONY',
        info: '65 Yrs · Female',
        id: '25-47219',
        phone: '9946984648'
      } : null
    }));
    // this.groupSlots();
  }

  groupSlots() {
    this.slotRows = []; // Clear before re-grouping
    const perRow = this.ColumnsPerRow;
    for (let i = 0; i < this.realSlots.length; i += perRow) {
      this.slotRows.push(this.realSlots.slice(i, i + perRow));
    }


    // this.slotRows=this.realSlots
  }

  prevDay() {
    let sd = new Date(
      this.selectedDate.setDate(this.selectedDate.getDate() - 1)
    );
    const selectedDateStr = this.datePipe ? this.datePipe.transform(sd, 'dd-MM-yyyy') : null;
    const todayStr = this.datePipe ? this.datePipe.transform(new Date(), 'dd-MM-yyyy') : null;
    if (selectedDateStr && todayStr && selectedDateStr < todayStr) {
      this.notification.showNotification('Cannot select past date', 'warning')
      return
    }
    this.selectedDate = sd
    // console.log(this.selectedDate,this.datePipe.transform(this.selectedDate()));
    this.CalenderData.fullDate = this.selectedDate.toString()
    // this.getAllDocDailyPageFns()


    this.getAllDocDailyPageFns(this.CalenderData.BranchId ?? '', this.CalenderData.DoctId ?? '', this.CalenderData.fullDate)

  }

  nextDay() {
    this.selectedDate = new Date(
      this.selectedDate.setDate(this.selectedDate.getDate() + 1)
    );
    console.log(this.selectedDate);
    this.CalenderData.fullDate = this.selectedDate.toString()


    this.getAllDocDailyPageFns(this.CCmoduleConfig.branchId, this.CalenderData.DoctId ?? '', this.CalenderData.fullDate)
  }



  modalType: 'reg' | 'cancel' = 'reg'
  SelectedBookingId: string = ''

  onSlotClick(slot: Slots) {
    console.log('Slot clicked:', slot);
    if (slot.breakSlot) {
      this.notification.showNotification('This is a break slot', 'warning')
      return
    };
    if (!slot.tokenDetils) {
      this.modalType = 'reg'
      this.SelectedToken = slot.tokenNo
      this.isModalOpen = true

    }
    else {
      this.modalType = 'cancel'
      this.SelectedToken = slot.tokenNo
      this.SelectedBookingId = slot.tokenDetils.bk_Id ?? ''
      this.isModalOpen = true
    }

  }





  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    // this.ngOnInit()

    this.getAllDocDailyPageFns(this.CCmoduleConfig.branchId, this.CalenderData.DoctId ?? '', this.CalenderData.fullDate)

  }

  onModalDismiss() {
    console.log('Modal dismissed');
  }
}