export interface BookingVisitReport {
 vdate: string;               // "DD/MM/YYYY"
  v_DATE: string;              // ISO datetime

  doctoR_NAME: string;
  sesS_DESC: string;
  visiT_TIME: string;

  age: string;
  patI_GENDER: string;

  bK_TOKEN_NO: string;

  "patienT#": string | null;   // special field
  patient: string;

  createD_BY: string;
  bookeD_DATE: string;

  mobile: string;
  reG_TYPE: string;

  oldoP_NO: string | null;
  patI_EMAIL: string | null;

  sesS_ID: string;
  chaT_SESSION_ID: string | null;
  patienT_ACTIVE: string | null;

  iS_TELE_APPOINTMENT: string;   // Y/N
  status: string;                // VISITED / WAITING etc

  patI_ID: string;
  opvisiT_ID: string;

  apP_CONFIRM_REMARK: string | null;

  docT_PROC: string | null;

  bR_REMARKS: string | null;
  bR_MESSAGES: string | null;
  bK_BLOCK_DESC: string | null;

  patI_PHOTO: string | null;
  visiT_COLOR: string;           
}