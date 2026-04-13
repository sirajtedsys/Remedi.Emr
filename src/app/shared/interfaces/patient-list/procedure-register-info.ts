export interface ProcedureRegisterInfo {
  pkG_NAME: string | null;
  patI_ID: string | null;
  bilL_DATE: string | null;   // ISO datetime string
  prC_BK_ROOM_NAME: string | null;
  prC_BK_MACHINE_NAME: string | null;
  pR_ID: string | null;
  machinE_ID: string | null;
  prC_BK_ROOM_ID: string | null;
  starT_DATE: string | null;  // ISO datetime string
  enD_DATE: string | null;    // ISO datetime string
  nexT_PRC_DATE: string | null; // ISO datetime string
  createD_BY: string | null;
  createD_ON: string | null;  // ISO datetime string
  progresS_NOTE: string | null;
  prC_TYPE: string | null;
  tsT_ID: string | null;
  prcgrP_ID: string | null;
  pkgalloC_ID: number | null;
  bilL_DTL_ID: string | null;
  bilL_HDR_ID: string | null;
  docT_ID: string | null;
  docT_NAME: string | null;
}
