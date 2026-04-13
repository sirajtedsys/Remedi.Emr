import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonIcon, IonDatetime, IonModal, IonDatetimeButton, IonSelectOption, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeCircleOutline, eyeOutline, peopleOutline } from 'ionicons/icons';
import { CommonApiService } from 'src/app/shared/services/common-api.service';
import { ProcedureBookingService } from 'src/app/shared/services/remedi.cc/procedure-booking.service';
import { LookUp } from 'src/app/shared/interfaces/lookup/lookup';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MachineToken } from 'src/app/shared/interfaces/remedi.cc/procedure-booking/machine-token';
import { MachineSlots } from 'src/app/shared/class/remedi.cc/procedure-booking/machine-and-slots';
import { firstValueFrom } from 'rxjs';
import { ProcBookingRegPage } from "./proc-booking-reg/proc-booking-reg.page";
// import { IonModal } from '@ionic/angular/common';
// import { IonSelect } from '@ionic/angular';
// import { IonModal } from '@ionic/angular/common';

@Component({
  selector: 'app-procedure-booking',
  templateUrl: './procedure-booking.page.html',
  styleUrls: ['./procedure-booking.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonSelect, IonIcon, IonDatetime, IonModal, IonDatetimeButton, IonSelectOption, IonButtons, ProcBookingRegPage]
})
export class ProcedureBookingPage implements OnInit {

  Branch!: LookUp;

  RoomsList: LookUp[] = [];
  MachineList: LookUp[] = [];
  selectedRoom: string = '';
  MachineTokens: MachineToken[] = []
  
  modalType: 'reg' | 'cancel' = 'reg'

  MachineAndSlots: MachineSlots[] = []

  selectedDate = new Date().toISOString();
  constructor(
    private commonApi: CommonApiService,
    private procedureBooking: ProcedureBookingService,
    private datePipe: DatePipe,
    private notificationService: NotificationService
  ) {
    addIcons({ eyeOutline, peopleOutline,closeCircleOutline });
  }

  ngOnInit() {
    this.getEmployeeBranch()
  }


  async getEmployeeBranch() {
    (await this.commonApi.getEmployeeBranches()).subscribe(res => {
      console.log(res);
      this.Branch = res[0]
      this.loaders()

    }
    )
  }


  loaders() {
    this.getRooms()
  }

  async getRooms() {
    (await this.procedureBooking.getRooms(this.Branch.id ?? '')).subscribe(res => {
      console.log(res);
      this.RoomsList = res
      if (this.RoomsList.length == 1) {
        this.selectedRoom = this.RoomsList[0].id ?? ''
        this.getMachines(this.RoomsList[0].id ?? '', this.Branch.id ?? '')
      }
    }
    )
  }

  onRoomSelectionChange(roomId: string) {
    console.log(roomId);
  }


  async getMachines(roomId: string, branchId: string) {
    (await this.procedureBooking.getMachines(roomId, branchId)).subscribe(async (data: any) => {
      console.log(data);
      this.MachineList = data

      this.MachineAndSlots = []

      for (let i = 0; i < this.MachineList.length; i++) {
        let ms = new MachineSlots()
        ms.MachineName = this.MachineList[i].name ?? ''
        ms.MachineId = this.MachineList[i].id ?? ''

        await this.getmachineslots(this.MachineList[i].id ?? '').then((data) => {
          ms.Slots = data;
        });

        this.MachineAndSlots.push(ms)


      }
      // if(this.MachineList.length==1)
      // {
      // }
      console.log(this.MachineAndSlots);
      

    })
  }


  onDateChange(event: any) {
    console.log(event._d);

    const eventDateStr = this.datePipe && event?._d ? this.datePipe.transform(event._d, 'yyyy-MM-dd') : null;
    const todayStr = this.datePipe ? this.datePipe.transform(new Date(), 'yyyy-MM-dd') : null;
    if (eventDateStr && todayStr && eventDateStr <= todayStr) {
      console.log('yes');
      this.loaders()
      this.selectedDate = eventDateStr;

    }
    else {
      this.notificationService.showNotification("Date should not be greater than today's date", 'error');
    }

  }


  async getmachineslots(machineid: string): Promise<MachineToken[]> {
    const data = await firstValueFrom(
      await this.procedureBooking.getMachineSlots(machineid, this.Branch.id ?? '', this.selectedDate)
    )
    return data
  }



    isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    // this.ngOnInit()

    // this.getAllDocDailyPageFns(this.CCmoduleConfig.branchId, this.CalenderData.DoctId ?? '', this.CalenderData.fullDate)

  }


  
  onModalDismiss() {
    console.log('Modal dismissed');
  }



  onSlotClick(slot: MachineToken) {
    console.log(slot);
    this.openModal()
  }
}
