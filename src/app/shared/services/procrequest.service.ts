import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
// import { AppConfig } from '../class/app-config';
import { TokenService } from './token.service';
import { ApiService } from './api.service';
import { AppConfig } from '../class/app-config';
import { bmrequest } from '../class/bmrequest';
import { bmchecking } from '../class/bmchecking';
import { PatientMsg } from '../class/patientmsg';
import { ProgressNote } from '../class/progressnote';
@Injectable({
  providedIn: 'root'
})
export class ProcrequestService {

    appconfig =new AppConfig()

 constructor(
  private http:HttpClient,
  private authser:AuthService,
  private tokenService:TokenService,
  private apiService:ApiService,
    private router:Router
  ) {}

 async getProcedure() 
  {
    let endpoint = 'procrequest/proc-list'
    return await this.apiService.get(endpoint);

  }

    async getReqProcDetails(emrDocid: any,patId:any) 
  {
    console.log(emrDocid)
    let endpoint = 'procrequest/proc-details'
    const queryParams = {
    emrDocid: emrDocid,
    patId:patId
    };
    return await this.apiService.get(endpoint,queryParams);
  }
  
  async getPrescProcedure(emrDocid: any,patId:any) 
  {
    console.log(emrDocid)
    let endpoint = 'procrequest/order-details'
    const queryParams = {
    emrDocid: emrDocid,
    patId:patId
  
    };
    return await this.apiService.get(endpoint,queryParams);
  }
  
  async getProcDone(empId:any) 
  {
    let endpoint = 'procrequest/proceduredone'
    const queryParams = {
    empId: empId  
    };
    return await this.apiService.get(endpoint,queryParams);
  }
  
  async getBMCheckingTestIds(emrDocid: any) 
  {
    console.log(emrDocid)
    let endpoint = 'procrequest/checking-testid'
    const queryParams = {
    emrDocid: emrDocid
    };
    return await this.apiService.get(endpoint,queryParams);
  }

   async getSuggestedProcedure(emrDocid: any) 
  {
    console.log(emrDocid)
    let endpoint = 'procrequest/suggestedproc-details'
    const queryParams = {
    emrDocid: emrDocid
    };
    return await this.apiService.get(endpoint,queryParams);
  }
  async getMedicineDet(emrDocid: any,patId:any) 
  {
    console.log(emrDocid)
    let endpoint = 'procrequest/medicines-details'
    const queryParams = {
    emrDocid: emrDocid,
    patId:patId
    };
    return await this.apiService.get(endpoint,queryParams);
  }
  
  async getTreatmetPlan(emrDocid: any,patId:any) 
  {
    console.log(emrDocid)
    let endpoint = 'procrequest/treatment-plan'
    const queryParams = {
    emrDocid: emrDocid,
    patId:patId
    };
    return await this.apiService.get(endpoint,queryParams);
  }
  


  procRequestSave(payload: bmrequest) {
  const endpoint = 'procrequest/proc-request-save'; // your .NET endpoint
  return this.apiService.post(endpoint, payload);
}

   async  prescribedprocSave(bmcheck:bmchecking) 
    {
      let endpoint = 'procrequest/prescribedproc-save'
      return await this.apiService.post(endpoint,bmcheck)
    }
  async procReqDelete(bmReqId: number) 
  {
    console.log(bmReqId)
    let endpoint = 'procrequest/proc-delete'
    const queryParams = {
    bmReqId: bmReqId
    };
    return await this.apiService.get(endpoint,queryParams);
  }

   async getPrevisitdetails(patId:any,eDocid:any,empId:any,strwhere:any,strcnt:any)
  {
    console.log(patId)
    let endpoint = 'procrequest/previsit-details'
    const queryParams = {
    patId: patId,
    eDocid:eDocid,
    empId:empId,
    strwhere:strwhere,
    strcnt:strcnt
    };
    return await this.apiService.get(endpoint,queryParams);
  }

   async getPatientType() 
  {
    let endpoint = 'procrequest/patient-type'
    return await this.apiService.get(endpoint);

  }
  async getPatientTypeByPatiId(patId: any)
  {
    let endpoint = 'procrequest/patient-type-id'
    const queryParams = {
    patId: patId
    };
    return await this.apiService.get(endpoint,queryParams);
  }
  
    async  savePatientMessage(lv:PatientMsg) 
    {
      let endpoint = 'procrequest/patient-message-save'
      return await this.apiService.post(endpoint,lv)
    }
   async  UpdatePatientType(patId:any ,oldTypeId:any ,newTypeId:any) 
    {
          console.log(patId)
              console.log(newTypeId)
      console.log(oldTypeId)
      let endpoint = 'procrequest/update-patient-type'
        const payload = {
    patientId: patId,
    oldTypeId: oldTypeId,
    newTypeId: newTypeId
  };

  return await this.apiService.get(endpoint, payload);
    }
    async getPatientMessageDates(patId: any) 
  {
    console.log(patId);
    
    let endpoint = 'procrequest/get-Dates'
    const queryParams = {
    patId: patId
    };
    return await this.apiService.get(endpoint,queryParams);
  }
  
  async GetDatedetails(selectedDate:any,patId: any) 
  {
    console.log(patId);
    
    let endpoint = 'procrequest/date-details'
    const queryParams = {
    selectedDate: selectedDate,
    patId:patId
    };
    return await this.apiService.get(endpoint,queryParams);
  }
  
  async saveProgressNote(data: ProgressNote) {
  let endpoint = 'procrequest/progressnote-save';
  return await this.apiService.post(endpoint, data);
}
// Get list of progress notes
async getProgressNoteList(emrDocId: any) {
   let endpoint = 'procrequest/progressnoteList'
    const queryParams = {
    emrDocId: emrDocId
    };
    return await this.apiService.get(endpoint,queryParams);
}

 async submitPatientMessageEditRequest(messageId:any,patId:any,message:any,editstatus:any ,remarks:any) {

  console.log(messageId)
      
      let endpoint = 'ccmodule/update-patient-request'
         const queryParams = {
    messageId: messageId,
    patId:patId,
    message:message,
    editstatus:editstatus,
    remarks:remarks
    };
  return await this.apiService.get(endpoint, queryParams);  
 
}


  async getProcedureDevice() 
  {
    let endpoint = 'procedurenote/procedure-device'
    return await this.apiService.get(endpoint);

  }
   async getProcedureCategory() 
  {
    let endpoint = 'procedurenote/procedure-category'
    return await this.apiService.get(endpoint);

  }
     async getClinicalIntent() 
  {
    let endpoint = 'procedurenote/clinical-intent'
    return await this.apiService.get(endpoint);

  }

  
  async saveProcedureNote(data:any ) {
  let endpoint = 'procedurenote/save-procedure-note';
  return await this.apiService.post(endpoint, data);
}

async getLastProcedureNote(patiId: string, emrDocId: string) {
  let endpoint = `procedurenote/get-last-procedure-note?patiId=${patiId}&emrDocId=${emrDocId}`;
  return await this.apiService.get(endpoint);
}

}
