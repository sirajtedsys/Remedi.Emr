export interface PatientSearchCombined {
  patiId: string;

  patiName?: string;
  pati_Name?: string;

  mobNo?: string;
  address?: string;
  pati_Address?: string;

  opno?: string;
  pati_Opno?: string;

  pati_Gender?: string;
  pati_Age?: string;
  pati_Birth_Date?: string;

  idCardNo?: string | null;
  idCard_Id?: string | null;

  cpr_Id?: string | null;
  cprNo?: string | null;

  port?: string;

  // extra fields from second object
  pati_Type_Id?: string;
  pcust_Id?: string | null;
  pati_Pay_Type?: string;
}
