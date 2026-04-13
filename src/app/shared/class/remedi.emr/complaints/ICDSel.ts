export class ICDSel{
    icdId: number=0;
    icdSlNo: number=0;
    icdCodeId: number=0;   //ICODE_ID
    icdCodeDtlsId: number=0;   //ICODE_DTLS_ID
    remarks: string | null =null;
    emrDocId?: string | null =null; 
    patiId?: string | null= null;

    isDropdownVisible:boolean=false



    Name:string=''
    Code:string=''
    // mrdUpdateSts: string = 'N';
    // mrdUpdateUsr: string | null = null;
    // mrdUpdateDate: Date | null = null;
}