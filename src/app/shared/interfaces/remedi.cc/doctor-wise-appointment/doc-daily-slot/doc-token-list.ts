export interface DoctorTokenList
 {
  opvisit_Id: string;
  bk_Opvisit_Status: string;
  bk_Id: string;

  pati_Opno: string;
  bk_Pat_Name: string;

  bk_Pat_Addr1: string;
  bk_Pat_Addr2: string | null;
  bk_Pat_Addr3: string | null;
  bk_Pat_Addr4: string | null;

  bkts_Id: string | null;
  bkts_Slot: string | null;
  bkts_Slot_Type: string | null;

  bk_Contact_No: string;
  bk_Block_Desc: string | null;

  opno: string;

  bk_Pat_Age: number;
  bk_Token_No: string;

  pati_Name: string;
  pati_Present_Add1: string;
  pati_Mobile: string;

  pati_Birth_Date: string;     // ISO date string from API

  br_Email_Id: string | null;
  idcard_Name: string | null;
  br_Id_No: string | null;

  bk_New_Reg: string;
  spec_Id: string;

  app_Type: string;
  reallo: string;
  gender: string;

  con_Status: string | null;
  patient_Arrived: string | null;
}
