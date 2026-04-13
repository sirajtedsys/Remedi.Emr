export interface PrescriptionPlan {
  meD_PLAN_SLNO: number;

  duniT_ID: number;
  duniT_NAME: string | null;

  dosagE_VAL: string;

  iteM_ID: string;
  iteM_NAME: string;

  freQ_ID: string;
  freQ_NAME: string;

  meD_ROUTE_ID: string;
  meD_ROUTE_NAME: string;

  meD_DOS_ID: string;
  meD_DOS_NAME: string;

  mgeN_ID: string;
  mgeN_NAME: string;

  duration: number;
  duratioN_MODE: number;

  remarks: string;

  beforE_FOOD: string;   // Y / N
  afteR_FOOD: string;    // Y / N
  dO_NOT_BILL: string;   // Y / N
  tesT_DOSE: string;     // Y / N

  toT_UNIT_ID: string;
  toT_QTY: number;

  disC_PERCENT: number;
  claiM_PERCENT: number;
  aprvL_TYPE_ID: number;
  claiM_ID: number;

  salE_RATE: number;
  salE_BRK_QTY: number;

  iteM_MS_TYPE: string;
  modE_ID: string;

  creatE_USER: string;
}