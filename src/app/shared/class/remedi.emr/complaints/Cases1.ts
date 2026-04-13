export class Cases1{
    CaseId: number=0;
    CaseCode:string | null =null;
    CaseName: string | null =null;
    ActiveStatus?: string | null= null;

    emrDocId:string | null =null;
    TreatmentSts: string | null =null;
    Medication?: string | null= null;
    Remarks?: string | null= null;
    OnTreatment:boolean=false
    CaseCheck:boolean=false
}