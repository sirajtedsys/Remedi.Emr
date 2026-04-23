export interface CaseDetails {
  casE_CODE: string;
  casE_ID: string;
  casE_NAME: string;

  emR_DOC_ID: string;

  medications: string | null;
  remarks: string | null;

  treatmenT_STS: string;   // "Y" / "N"
}