import { getRenderingRef } from "ionicons/dist/types/stencil-public-runtime";

export interface ProcedureDetailsDto {

  adV_DEDUCT_AMT?: number;
  ag?: string;
  barcode?: string;
  bdC_NO?: string | null;

  bilL_AMOUNT?: number;
  bilL_CANCEL?: string;
  bilL_CREATE_USER?: string;
  bilL_CUSTOMER_ADDRESS?: string;
  bilL_DATE?: string;   //bill date
  bilL_DATE_MANIPULATE?: string;
  bilL_DISC_AMT?: number;
  bilL_DTL_DISCOUNT_AMT?: number;
  bilL_DTL_DISCOUNT_PER?: number;
  bilL_DTL_ID?: string;
  bilL_DTL_QTY?: number;
  bilL_DTL_RATE?: number;
  bilL_DTL_TYPE?: string;
  bilL_GENDER?: string;
  bilL_HDR_ID?: string;
  bilL_NO?: string;  //bill no
  bilL_NO_MANIPULATE?: string;
  bilL_PRINT?: string;
  bilL_REF_DESC?: string;

  billeD_USR_CODE?: string;
  billentryuser?: string;
  billinG_PRINT_MESSAGE?: string;

  cR_DR_NOTE_NO?: string | null;
  canceL_REMARKS?: string | null;

  carD_HOLDER_NAME?: string | null;
  carD_NO?: string | null;
  casesheetid?: string | null;

  cgsT_TAX_AMT?: number;
  cgsT_TAX_PERC?: number;

  claiM_FORM_NO?: string | null;
  claiM_ID?: number;

  collecteD_AMT?: number;
  collecteD_STATUS?: string;
  collecteD_USER?: string | null;

  cusT_ADDR?: string | null;
  cusT_CONT_PERSON?: string | null;
  cusT_NAME?: string;
  cusT_ORDER_NO?: string | null;
  cusT_SHORT_NAME?: string;

  customertype?: string;
  delV_TIME?: string | null;
  detaileD_PRINT_NEEDED?: string;
  displaY_NAME_TEXT?: string | null;

  docT_PARTICULARES?: string;
  docT_QUALIFICATION?: string | null;

  duE_AMT?: number;
  emP_OFFL_NAME?: string;

  granD_GROSS_AMT?: number;
  granD_NET_AMT?: number;
  granD_TOT_AMT?: number;

  gross?: number;
  gstin?: string | null;

  hdR_TOKEN_NO?: number;
  hosP_NO?: string;
  hsn?: string | null;

  iN_PKG?: string;

  igsT_TAX_AMT?: number;
  igsT_TAX_PERC?: number;

  ipreG_DATE?: string | null;

  isR_COMP_NAME?: string | null;
  isR_DEDUCTED_AMT?: number;
  isR_TOTAL_AMT?: number;

  nationality?: string;
  neT_AMT?: number;

  opnO_PRINT_NAME?: string;

  paY_CC_SERVICE_CHARGE?: number;

  patI_ID?: string;
  patI_MOBILE?: string;
  patI_SERVNO?: string | null;
  patientname?: string;

  paymodes?: string;
  paytype?: string;

  pcusT_ID?: string;
  pcusT_ID_CARD_NO?: string | null;

  pkG_DIS_AMT?: number;
  pkgalloC_ID?: string;

  policY_NO?: string | null;

  prC_ACTUAL_RATE?: number;
  prC_CUST_CODE?: string | null;
  prC_ID?: string | null;
  prcname?: string | null;

  preV_DUE_AMT?: number;

  prvD_ADDR?: string | null;
  prvD_ID?: string | null;
  prvD_NAME?: string | null;
  prvD_SHORT_NAME?: string | null;
  prvD_TIN?: string | null;

  rate?: number;

  reF1?: string;
  reF1PARTICULAR?: string | null;
  reF1QUAL?: string | null;
  reF2?: string | null;

  remarkS_DTLS?: string | null;
  remarks?: string;

  reslT_DELIVERY_DATE?: string | null;
  roundofF_AMT?: number;

  salT_NAME?: string;
  scheM_NAME?: string | null;
  selF_STS?: string;

  sgsT_TAX_AMT?: number;
  sgsT_TAX_PERC?: number;

  slabbed?: string;
  taX_TYPE?: string;

  testname?: string;
  testshortname?: string;

  tokeN_NUMBER?: string;

  totaL_INCLU_AMT?: number;
  tsT_ROOM_NO?: string | null;
  warD_NAME?: string | null;
  status?:string | null;
  rooM_NO?:string | null;

  differencE_IN_MINUTES:number | null
  otheR_ROOM:string | null
}




// patientno
// pateint name
// gender
// age,procedure anme(trestname),doc name,
