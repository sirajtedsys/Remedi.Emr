import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ProcedureBookingService {

  constructor(
    private apiService: ApiService
  ) { }

  getMachineSlots(machineId: string, branchId: string, bookingDate: string) {
    return this.apiService.get('procedurebooking/machine-slots', { machineId: machineId, branchId: branchId, bookingDate: bookingDate });
  }

  getRooms(branchId: string) {
    return this.apiService.get('procedurebooking/rooms', { branchId: branchId });
  }

  getMachines(roomId: string, branchId: string) {
    return this.apiService.get('procedurebooking/machines', { roomId: roomId, branchId: branchId });
  }

}
