export class Cases{
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

// {
//     "CaseId": 1,
//     "CaseName": "Type 2 Diabetes Mellitus",
//     "ActiveStatus": "A",
//     "CaseCode": "T2DM",
//     "emrDocId": null,
//     "TreatmentSts": null,
//     "Medication": null,
//     "Remarks": null
// }