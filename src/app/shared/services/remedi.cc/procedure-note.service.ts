import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ProcedureNoteService {

  constructor(
    private apiService: ApiService
  ) { }


  insertProcedureNote(payload: any) {
    return this.apiService.post('procedurenote/insert-pn', payload);
  }



  UpdateProcedureNote(payload: any) {
    return this.apiService.post('procedurenote/update-pn', payload);
  }


  GetTherapistnotebyNoteID(noteId: any) {
    return this.apiService.get('procedurenote/pn-by-noteid', { noteId });
  }


  GetTherapistNote(prcId: any, BillhdrId: any) {
    return this.apiService.get('procedurenote/pn-by-prc-and-bhdr-id', { prcId, BillhdrId });
  }
}
