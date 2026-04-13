export interface PatientListDatewiseItem {
  type: string;
  opvdtlS_DOCTOR_ID: string;
  rownumber: number;

  creatE_DATE: string; // ISO date string

  regtY_ID: string;
  reG_TIME: string;
  vsT_TIME: string;

  emR_DOC_ID: string;
  cpR_ID: string;
  claiM_ID: number;

  opvisiT_ID: string;
  visittype: string;
  viP_STS: string;

  patI_ID: string;
  patI_OPNO: string;

  observation: string;
  consultatioN_PENDING_PAYMENT: string;

  patI_FIRST_NAME: string | null;
  patientname: string;
  name: string;

  docT_NAME: string;
  gender: string;

  departmenT_ID: string | null;
  departmenT_NAME: string | null;
  casE_SHEET_GENDER: string | null;

  visiT_STS: string;

  allergy: string | null;
  remarks: string | null;
  allergY_DTLS: string | null;
  docT_REMARKS: string | null;

  age: string;

  tockeN_NO: string;
  tokeN_TYPE: string;

  addr: string;
  patI_MOBILE: string;

  bK_TOKEN_TYPE: string;

  opvdtlS_ID: string;

  nexT_TOKEN_STS: string;
  tokeN_WAR: string;
  tokeN_CALL_STS: string;

  bK_VISIT_DATE: string | null;

  vitalS_SAVED: string;
  grP_STATUS: string;

  patI_TYPE_ID: string;
  iS_TELE_APPOINTMENT: string;

  chaT_SESSION_ID: string | null;
  patienT_ACTIVE: string | null;
  enD_TIME: string | null;

  cprno: string | null;
  department: string | null;

  iS_PATIENT_IN: string | null;
  patienT_IN_TIME: string | null;
  opvisiT_CANCEL: string | null;

  insurance: string | null;

  vitalS_IMG: string | null;
  luxurY_PKG_IMG: string | null;
  cliniC_TRIAGE_IMG: string | null;
  eR_TRIAGE_COLOR: string | null;

  neW_VISIT_IMG: string | null;

  ptyP_NAME: string;
  rgB_COLOR: string | null;
}
