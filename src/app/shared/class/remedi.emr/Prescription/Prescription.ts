export class Prescription{

  MedPslno?: number =0;
  EdocId?: string| null = null;
  DocId?: string| null = null;
  MedId?: string| null = null;
  FreqId?: string| null = null;
  MedRouteId?: string| null = null;
  Dur?: number=0 ;
  Rmrks?: string | null = null;
  Bf?: string="N";   //bf
  Af?: string='N';   //af
  PatI?: string| null = null;
  DosId?: string| null = null;    //Dosageid
  ClaimId?: number= 0;
  ClaimPercent?: number| null = null;
  DiscPercent?: number| null = null;
  AprvlTypeId?: number| null = null;
  ReadyToBill?: string| null = null;
  QtyTotal?: number| null = null;
  PSaleBrkQty?: number=0;
  PSaleBrkUnit?: number| null = null;
  DoNotBill?: string = 'N';
  PTestDose?: string='N';
  Obs?: string| null = null;
  TotUnit?: string| null = null;
  PDUnitId?: string| null = null;
  PDosageVal?: string| null = null;
//   RetVal?: number;

    Durval:number=0
    DurType:number=1
    DosNAme:string=''
    FreqName:string=''
    MedName:string=''
    RouteName:string=''
    GenricName:string=''
    ViewSearch:boolean=false

    hasCustomValues(): boolean {
        const defaultValues: Partial<Prescription> = {
          MedPslno: 0,
        //   EdocId: null,
          DocId: null,
          MedId: null,
          FreqId: null,
          MedRouteId: null,
          Dur: 0,
          Rmrks: null,
          Bf: "N",
          Af: "N",
        //   PatI: null,
          DosId: null,
          ClaimId: 0,
          ClaimPercent: null,
          DiscPercent: null,
          AprvlTypeId: null,
          ReadyToBill: null,
          QtyTotal: null,
          PSaleBrkQty: 0,
          PSaleBrkUnit: null,
          DoNotBill: 'N',
          PTestDose: "N",
          Obs: null,
          TotUnit: null,
          PDUnitId: null,
          PDosageVal: null,
          Durval: 0,
          DurType: 1,
          DosNAme: '',
          FreqName: '',
          MedName: '',
          RouteName: '',
          GenricName: '',
          ViewSearch: false
        };
      
        for (const key in defaultValues) {
          if ((this as any)[key] !== (defaultValues as any)[key]) {
            return true; // Found a custom value
          }
        }
      
        return false; // All values are default
      }


      MandatoryCheck(): boolean {
        const defaultValues: Partial<Prescription> = {
          MedId: null,
          FreqId: null,
          MedRouteId: null,
          QtyTotal: null,
          EdocId: null,
          PatI: null

        };
      
        for (const key in defaultValues) {
          if ((this as any)[key] === (defaultValues as any)[key]) {
            return false; // If any field has a default value, return false
          }
        }
      
        return true; // All fields have custom values
      }
      
      

}