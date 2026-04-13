export interface EmrPatientInfo {
  gp: string;
  emR_DOC_ID: string;
  patient: string;
  opnumber: string;
  patI_GENDER: string;
  patI_AGE: string;
  patI_ID: string;
  ipreG_DATE: string; // ISO date string: 2026-01-02T11:47:13
  emP_OFFL_NAME: string;
  cusT_NAME: string | null;
  docT_ID: string;
  dept: string;
  deptid: string;
  cpR_ID: string;
  idcarD_NO: string | null;
  opvisiT_CANCEL: string;
}
